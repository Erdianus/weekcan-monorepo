"use client";

import type { CellContext } from "@tanstack/react-table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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

type Event = inferData<typeof k.company.event.all>["data"][number];
const colHelper = createColumnHelper<Event>();
const Actions = ({ row }: CellContext<Event, unknown>) => {
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
          <Link href={`event/${data.id}/list-jobs`}>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              <span>Detail</span>
            </DropdownMenuItem>
          </Link>
          <Link href={`event/${data.id}/checklist`}>
            <DropdownMenuItem>
              <Task className="mr-2 h-4 w-4" />
              <span>Checklist</span>
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
  colHelper.accessor("name", {
    header: "Nama Proyek",
  }),
  colHelper.display({
    header: "Tanggal",
    cell: ({ row }) =>
      dateRange(row.original.start_date, row.original.end_date),
  }),
  colHelper.accessor("venue", {
    header: "Tempat",
    cell: ({ getValue }) => <div className="truncate">{`${getValue()}`}</div>,
  }),
  colHelper.accessor("pic", {
    header: "Koor.",
  }),
  colHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => <Badge variant={getValue()}>{getValue()}</Badge>,
  }),
  colHelper.display({
    id: "actions",
    cell: Actions,
  }),
];

const ListEventCompany = () => {
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const { data: events, isLoading } = k.company.event.all.useQuery({
    variables: {
      ...variables,
    },
  });

  const table = useReactTable({
    data: events?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const isload = !events && isLoading;

  return (
    <>
      <PortalSearch placeholder="Cari Proyek..." />
      <DataTable table={table} columns={columns} isloading={isload} />
      <div className="mt-4 flex w-full items-center justify-end gap-2">
        <Paginate />
        <PaginationParams meta={events?.meta} />
      </div>
    </>
  );
};

export default ListEventCompany;
