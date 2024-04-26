"use client";
import k, { inferData, useQueryClient } from "@repo/api/kit";
import {
  CellContext,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Paginate from "@ui/components/paginate";
import PaginationParams from "@ui/components/pagination-params";
import PortalSearch from "@ui/components/portal-search";
import { Badge } from "@ui/components/ui/badge";
import { Button } from "@ui/components/ui/button";
import { DataTable } from "@ui/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import Spinner from "@ui/components/ui/spinner";
import { H3 } from "@ui/components/ui/typograhpy";
import { dateRange } from "@ui/lib/date";
import useAlertStore from "@ui/lib/store/useAlertStore";
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

type Project = inferData<typeof k.project.all>["data"][number];
const colHelper = createColumnHelper<Project>();

const Actions = ({ row }: CellContext<Project, unknown>) => {
  const alert = useAlertStore();

  const { original: data } = row;

  const client = useQueryClient();
  const del = k.project.delete.useMutation({
    async onSuccess({ message }) {
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.company.all.getKey() });
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
          <Link href={`/project/${data.id}/update`}>
            <DropdownMenuItem>
              <Pencil className="mr-2 w-4 h-4" />
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
            <Trash2 className="mr-2 w-4 h-4" />
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
  colHelper.accessor("progress", {
    header: "Progres",
    cell: ({ getValue }) => <Badge variant={getValue()}>{getValue()}</Badge>,
  }),
  colHelper.display({
    id: "actions",
    cell: Actions,
  }),
];

const ListProject = () => {
  const searchParams = useSearchParams();
  const { data: projects, isLoading } = k.project.all.useQuery({
    variables: {
      search: searchParams.get("search"),
      page: searchParams.get("page"),
      paginate: searchParams.get("paginate"),
      company_id: searchParams.get("company_id"),
      company_name: searchParams.get("company_name"),
      progress: searchParams.get("progress"),
      user_id: searchParams.get("user_id"),
      user_name: searchParams.get("user_name"),
      from: searchParams.get("from"),
      to: searchParams.get("to"),
      province: searchParams.get("province"),
      city: searchParams.get("city"),
    },
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
      <div className="flex mb-4 w-full items-center justify-between">
        <H3 className="">Proyek</H3>
        <Button type="button" size={'icon'} asChild>
          <Link href={'project/create'}>
            <Plus />
          </Link>
        </Button>
      </div>
      <DataTable table={table} columns={columns} isloading={isload} />
      <div className="flex items-center mt-4 justify-end w-full">
        <Paginate />
        <PaginationParams meta={projects?.meta} />
      </div>
    </>
  );
};

export default ListProject;
