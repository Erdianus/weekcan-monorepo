"use client";

import type { CellContext } from "@tanstack/react-table";
import { useCallback } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import Paginate from "@hktekno/ui/components/paginate";
import PaginationParams from "@hktekno/ui/components/pagination-params";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { Button } from "@hktekno/ui/components/ui/button";
import { Checkbox } from "@hktekno/ui/components/ui/checkbox";
import { DataTable } from "@hktekno/ui/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import { dateRange } from "@hktekno/ui/lib/date";
import useAlertStore from "@hktekno/ui/lib/store/useAlertStore";

type TaskProject = inferData<typeof k.project.task.all>["data"][number];
const colHelper = createColumnHelper<TaskProject>();

const Actions = ({ row }: CellContext<TaskProject, unknown>) => {
  const params = useParams<{ project_id: string }>();
  const alert = useAlertStore();

  const { original: data } = row;

  const client = useQueryClient();
  const del = k.project.task.delete.useMutation({
    async onSuccess({ message }) {
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.project.task.all.getKey() });
    },
    onError: ({ message }) => toast.error(message),
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
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Link href={`/project/${data.id}`}>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              <span>Detail</span>
            </DropdownMenuItem>
          </Link>
          <Link href={`/project/${params.project_id}/task/update/${data.id}`}>
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
                header: `Yakin ingin mengapus '${data.task_name}'?`,
                desc: "Kerjaan yang dihapus tidak dapat dikembalikan lagi",
                onConfirm: () => {
                  del.mutate({ id: [`${data.id}`] });
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
    id: "checkbox",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  colHelper.accessor("task_name", {
    header: "Kerjaan",
  }),
  colHelper.display({
    header: "Tanggal",
    cell: ({ row }) => {
      const { start_date, end_date } = row.original;
      return dateRange(start_date, end_date);
    },
  }),
  colHelper.accessor("set_by", {
    header: "Karyawan",
  }),
  colHelper.accessor("task_status", {
    header: "Status",
    cell: ({ getValue }) => <Badge variant={getValue()}>{getValue()}</Badge>,
  }),
  colHelper.display({
    id: "actions",
    cell: Actions,
  }),
];

const ListTaskProject = ({ project_id }: { project_id: string }) => {
  const alert = useAlertStore();
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());

  const client = useQueryClient();
  const { data: tasks, isLoading } = k.project.task.all.useQuery({
    variables: { ...variables, project_id },
  });

  const del = k.project.task.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      table.toggleAllPageRowsSelected(false);
      await client.invalidateQueries({ queryKey: k.project.task.all.getKey() });
    },
  });

  const table = useReactTable({
    data: tasks?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onClickDelete = useCallback(() => {
    alert.setData({
      open: true,
      header: "Yakin ingin menghapus banyak kerjaan ini?",
      desc: "Kerjaan yang sudah dihapus tidak dapat dikembalikan lagi",
      onConfirm: () => {
        const id = table
          .getFilteredSelectedRowModel()
          .rows.map((r) => `${r.original.id}`);
        del.mutate({ id });
      },
    });
  }, []);

  const isChecked = !!table.getFilteredSelectedRowModel().rows.length;

  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">Tugas</H3>
        <Button
          variant={isChecked ? "destructive" : "default"}
          type="button"
          size={"icon"}
          asChild={!isChecked}
          onClick={isChecked ? onClickDelete : undefined}
        >
          {isChecked ? (
            <>{del.isPending ? <Spinner /> : <Trash2 />}</>
          ) : (
            <Link href={`/project/${project_id}/task/create`}>
              <Plus />
            </Link>
          )}
        </Button>
      </div>
      <PortalSearch placeholder="Cari Kerjaan..." />
      <DataTable table={table} columns={columns} isloading={isLoading} />
      <div className="mt-4 flex w-full items-center justify-end">
        <Paginate />
        <PaginationParams meta={tasks?.meta} />
      </div>
    </>
  );
};

export default ListTaskProject;
