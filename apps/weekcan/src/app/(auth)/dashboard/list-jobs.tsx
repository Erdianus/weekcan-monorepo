"use client";

import type { CellContext } from "@tanstack/react-table";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { Button } from "@hktekno/ui/components/ui/button";
import { DataTable } from "@hktekno/ui/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { dateRange } from "@hktekno/ui/lib/date";
import useAlertStore from "@hktekno/ui/lib/store/useAlertStore";
import useUserStore from "@hktekno/ui/lib/store/useUserStore";
import { cn } from "@hktekno/ui/lib/utils";

type Job = inferData<typeof k.job.all>["data"][number];
const colHelper = createColumnHelper<Job>();

const Action = ({ row }: CellContext<Job, unknown>) => {
  const alert = useAlertStore();
  const data = row.original;
  const client = useQueryClient();
  const update = k.job.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.job.all.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            {update.isPending ? (
              <Spinner />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={data.status}
            onValueChange={(status) => {
              alert.setData({
                open: true,
                confirmText: "Ya, Ubah",
                desc: "",
                header: (
                  <div>
                    Yakin ingin mengubah status menjadi{" "}
                    <span
                      className={cn(
                        status === "Done" && "text-green-500",
                        status === "On Going" && "text-yellow-500",
                        status === "Canceled" && "text-red-500",
                      )}
                    >
                      {status}
                    </span>{" "}
                  </div>
                ),
                onConfirm: () => {
                  update.mutate({
                    id: `${data.id}`,
                    data: { status },
                  });
                },
              });
            }}
          >
            <DropdownMenuRadioItem
              className="hover:bg-gray-500 hover:text-white data-[state=checked]:text-gray-500 dark:hover:bg-gray-300 dark:hover:text-gray-700 "
              value="No Progress"
            >
              No Progress
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="Koordinasi"
              className="hover:bg-yellow-500 hover:text-white data-[state=checked]:text-yellow-500 dark:hover:bg-yellow-300 dark:hover:text-yellow-700 "
            >
              Koordinasi
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="Konfirmasi"
              className="hover:bg-orange-500 hover:text-white data-[state=checked]:text-orange-500 dark:hover:bg-orange-300 dark:hover:text-orange-700 "
            >
              Konfirmasi
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="Loading"
              className="hover:bg-blue-500 hover:text-white data-[state=checked]:text-blue-500 dark:hover:bg-blue-300 dark:hover:text-blue-700 "
            >
              Loading
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="Done"
              className="hover:bg-green-500 hover:text-white data-[state=checked]:text-green-500 dark:hover:bg-green-300 dark:hover:text-green-700"
            >
              Done
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="Canceled"
              className="hover:bg-red-500 hover:text-white data-[state=checked]:text-red-500 dark:hover:bg-red-300 dark:hover:text-red-700 "
            >
              Cancel
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const columns = [
  colHelper.display({
    header: "No",
    cell: ({ row }) => row.index + 1,
  }),

  colHelper.accessor("name", {
    header: "Kerjaan",
  }),
  colHelper.accessor("qty", {
    header: "Jumlah",
    cell: ({ getValue, row }) => `${getValue()} ${row.original.unit_of_qty}`,
  }),
  colHelper.accessor("frq", {
    header: "Frekuensi",
    cell: ({ getValue, row }) => `${getValue()} ${row.original.frq_of_use}`,
  }),
  colHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => <Badge variant={getValue()}>{getValue()}</Badge>,
  }),
  colHelper.accessor("time", {
    header: "Tanggal",
    cell: ({ getValue }) => dateRange(getValue()),
  }),
  colHelper.display({
    id: "Action",
    cell: Action,
  }),
];

export function ListJobs() {
  const user = useUserStore();
  const {
    data: jobs,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = k.job.all_infinity.useInfiniteQuery({
    variables: { pic_id: `${user.id}` },
  });

  const data = useMemo(() => {
    let d: Job[] = [];

    jobs?.pages.forEach((page) => {
      d = [...page.data, ...d];
    });

    return d;
  }, [jobs]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <DataTable table={table} columns={columns} isloading={isLoading} />
      <div className="mt-2 flex flex-wrap items-center justify-center">
        {hasNextPage && (
          <Button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage && <Spinner />}
            <span>Tampilkan Lebih</span>
          </Button>
        )}
      </div>
    </>
  );
}
