"use client";
import k, { inferData } from "@repo/api/kit";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Paginate from "@ui/components/paginate";
import PaginationParams from "@ui/components/pagination-params";
import { Badge } from "@ui/components/ui/badge";
import { DataTable } from "@ui/components/ui/data-table";
import { H3 } from "@ui/components/ui/typograhpy";
import { dateRange } from "@ui/lib/date";

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
  colHelper.accessor("progress", {
    header: "Progres",
    cell: ({ getValue }) => <Badge variant={getValue()}>{getValue()}</Badge>,
  }),
];

const ListProject = () => {
  const { data: projects, isLoading } = k.project.all.useQuery();

  const table = useReactTable({
    data: projects?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const isload = !projects && isLoading;

  return (
    <>
      <H3 className="mb-4">Proyek</H3>
      <DataTable table={table} columns={columns} isloading={isload} />
      <div className="flex items-center mt-4 justify-end w-full">
        <Paginate />
        <PaginationParams meta={projects?.meta} />
      </div>
    </>
  );
};

export default ListProject;
