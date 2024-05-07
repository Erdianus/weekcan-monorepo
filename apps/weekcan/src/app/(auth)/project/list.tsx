"use client";

import type { CellContext } from "@tanstack/react-table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
import { Separator } from "@hktekno/ui/components/ui/separator";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { Task } from "@hktekno/ui/icon";
import { dateRange } from "@hktekno/ui/lib/date";
import useAlertStore from "@hktekno/ui/lib/store/useAlertStore";

import FilterProject from "./filter";

type Project = inferData<typeof k.project.all>["data"][number];
const colHelper = createColumnHelper<Project>();

const Actions = ({ row }: CellContext<Project, unknown>) => {
  const alert = useAlertStore();

  const { original: data } = row;

  const client = useQueryClient();
  const del = k.project.delete.useMutation({
    async onSuccess({ message }) {
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.project.all.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });
  return (
    <>
      <DropdownMenu
        onOpenChange={async () => {
          await client.prefetchQuery(
            k.project.single.getFetchOptions({ id: `${data.id}` }),
          );
        }}
      >
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
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Link href={`/project/${data.id}`}>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              <span>Detail</span>
            </DropdownMenuItem>
          </Link>
          <Link href={`/project/${data.id}/task`}>
            <DropdownMenuItem>
              <Task className="mr-2 h-4 w-4" />
              <span>Tugas</span>
            </DropdownMenuItem>
          </Link>
          <Link href={`/project/update/${data.id}`}>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={() =>
              alert.setData({
                open: true,
                confirmText: "Ya, Hapus",
                header: `Yakin ingin mengapus '${data.project_name}'?`,
                desc: "Proyek yang dihapus tidak dapat dikembalikan lagi",
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
  colHelper.accessor("project_name", {
    header: "Nama Proyek",
  }),
  colHelper.display({
    header: "Tanggal",
    cell: ({ row }) =>
      dateRange(row.original.start_date, row.original.end_date),
  }),
  colHelper.display({
    header: "Tempat",
    cell: ({ row: { original: data } }) => (
      <div className="truncate">{`${data.venue_name}, ${data.location}`}</div>
    ),
  }),
  colHelper.accessor("pic_name", {
    header: "PIC",
  }),
  colHelper.accessor("company", {
    header: "Perusahaan",
    cell: ({ getValue }) => {
      if (!getValue().length) return "-";

      return (
        <div className="flex items-center gap-4">
          {getValue()[0]?.company_name}
          {getValue().length > 1 && (
            <Badge variant={"secondary"}>{getValue().length - 1}+</Badge>
          )}
        </div>
      );
    },
  }),
  colHelper.accessor("progress", {
    header: "Progress",
    cell: ({ getValue }) => <Badge variant={getValue()}>{getValue()}</Badge>,
  }),
  colHelper.display({
    id: "actions",
    cell: Actions,
  }),
];

const ListProject = () => {
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const { data: projects, isLoading } = k.project.all.useQuery({
    variables,
  });

  const table = useReactTable({
    data: projects?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const isload = !projects && isLoading;

  return (
    <>
      <PortalSearch placeholder="Cari Proyek..." />

      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          Filter
          <Separator className="flex-1" />
        </div>
        <div className="flex flex-wrap gap-4">
          <FilterProject />
        </div>
      </div>
      <DataTable table={table} columns={columns} isloading={isload} />
      <div className="mt-4 flex w-full items-center justify-end">
        <Paginate />
        <PaginationParams meta={projects?.meta} />
      </div>
    </>
  );
};

export default ListProject;
