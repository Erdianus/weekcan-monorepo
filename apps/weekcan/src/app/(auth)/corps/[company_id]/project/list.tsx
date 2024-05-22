"use client";

import type { CellContext } from "@tanstack/react-table";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, MoreHorizontal } from "lucide-react";

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
import { Task } from "@hktekno/ui/icon";
import { dateRange } from "@hktekno/ui/lib/date";

type Project = inferData<typeof k.project.all>["data"][number];
const colHelper = createColumnHelper<Project>();
const Actions = ({ row }: CellContext<Project, unknown>) => {
  const params = useParams<{ company_id: string }>();

  const { original: data } = row;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
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
          <Link
            href={`/corps/${params.company_id}/task?project_id=${data.id}&project_name=${data.project_name}`}
          >
            <DropdownMenuItem>
              <Task className="mr-2 h-4 w-4" />
              <span>Tugas</span>
            </DropdownMenuItem>
          </Link>
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
    header: "Koor.",
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

const ListProjectCompany = ({ company_id }: { company_id: string }) => {
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const { data: projects, isLoading } = k.project.all.useQuery({
    variables: {
      ...variables,
      company_id,
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
      <DataTable table={table} columns={columns} isloading={isload} />
      <div className="mt-4 flex w-full items-center justify-end gap-2">
        <Paginate />
        <PaginationParams meta={projects?.meta} />
      </div>
    </>
  );
};

export default ListProjectCompany;
