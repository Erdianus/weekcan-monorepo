"use client";

import type { CellContext } from "@tanstack/react-table";
import { useParams, useSearchParams } from "next/navigation";
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
import Paginate from "@hktekno/ui/components/paginate";
import PaginationParams from "@hktekno/ui/components/pagination-params";
import PortalSearch from "@hktekno/ui/components/portal-search";
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
            <DropdownMenuRadioItem value="Done">Done</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="On Going">
              On Going
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Canceled">
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
  colHelper.accessor("pic", {
    header: "PIC",
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

const ListJobs = () => {
  const params = useParams<{ event_id: string }>();
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const { data: jobs, isLoading } = k.job.all.useQuery({
    variables: { ...variables, event: params.event_id },
  });

  const table = useReactTable({
    data: jobs?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <PortalSearch />
      <DataTable table={table} columns={columns} isloading={isLoading} />
      <div className="mt-4 flex flex-wrap items-center justify-end">
        <Paginate />
        <PaginationParams meta={jobs?.meta} />
      </div>
    </>
  );
};

export default ListJobs;
