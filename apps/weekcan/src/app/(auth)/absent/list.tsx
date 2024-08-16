"use client";

import type { CellContext } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import FileIcon from "@hktekno/ui/components/file-icon";
import { FilterContainer } from "@hktekno/ui/components/filter-container";
import Paginate from "@hktekno/ui/components/paginate";
import PaginationParams from "@hktekno/ui/components/pagination-params";
import { Button } from "@hktekno/ui/components/ui/button";
import { DataTable } from "@hktekno/ui/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
import Spinner from "@hktekno/ui/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@hktekno/ui/components/ui/tooltip";
import { dateRange } from "@hktekno/ui/lib/date";
import useAlertStore from "@hktekno/ui/lib/store/useAlertStore";

import FilterAbsent from "./filter";

type Absent = inferData<typeof k.absent.all>["data"][number];
const colHelper = createColumnHelper<Absent>();

const Action = ({ row }: CellContext<Absent, unknown>) => {
  const data = row.original;

  const alert = useAlertStore();
  const client = useQueryClient();
  const del = k.absent.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.absent.all.getKey() });
    },
  });
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            {del.isPending ? (
              <Spinner />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              alert.setData({
                open: true,
                confirmText: "Ya, Hapus",
                header: `Yakin ingin mengapus izin?`,
                desc: "Izin yang dihapus tidak dapat dikembalikan lagi",
                onConfirm: () => {
                  del.mutate({ id: data.id });
                },
              })
            }
            className="hover:bg-red-500 dark:hover:bg-red-900 dark:hover:text-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Hapus</span>
          </DropdownMenuItem>
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
    header: "Nama",
    cell: ({ getValue, row }) => {
      return (
        <div className="flex items-center gap-4">
          <div>{getValue()}</div>
          {!!row.original.file_path && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a href={row.original.file_link} target="_blank">
                  <FileIcon text={row.original.file_path} />
                </a>
              </TooltipTrigger>
              <TooltipContent>File</TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
  }),
  colHelper.accessor("date", {
    header: "Tanggal",
    cell: ({ getValue }) => dateRange(getValue()),
  }),
  colHelper.accessor("desc", {
    header: "Alasan",
    cell: ({ getValue }) => (
      <div className="whitespace-nowrap">{getValue()}</div>
    ),
  }),
  colHelper.accessor("type_of_absent", {
    header: "Tipe",
  }),
  colHelper.display({
    id: "actions",
    cell: Action,
  }),
];

const ListAbsent = () => {
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const { data: absents, isLoading } = k.absent.all.useQuery({ variables });
  const table = useReactTable({
    data: absents?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <FilterContainer>
        <FilterAbsent isLoading={isLoading} />
      </FilterContainer>
      <DataTable columns={columns} table={table} isloading={isLoading} />
      <div className="mt-4 flex w-full items-center justify-end gap-2">
        <Paginate />
        <PaginationParams meta={absents?.meta} />
      </div>
    </>
  );
};

export default ListAbsent;
