"use client";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { DataTable } from "@hktekno/ui/components/ui/data-table";
import { dateRange } from "@hktekno/ui/lib/date";

type Project = inferData<typeof k.project.all>["data"][number];
const colHelper = createColumnHelper<Project>();

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
];

const ListProject = () => {
  const { data: projects, isLoading } = k.project.all.useQuery();

  const table = useReactTable({
    data: projects?.data.slice(0, 3) ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const isload = !projects && isLoading;
  return <DataTable table={table} columns={columns} isloading={isload} />;
};

export default ListProject;
