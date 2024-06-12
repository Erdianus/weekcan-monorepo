"use client";

import { useParams, useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import Paginate from "@hktekno/ui/components/paginate";
import PaginationParams from "@hktekno/ui/components/pagination-params";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { DataTable } from "@hktekno/ui/components/ui/data-table";
import { dateRange } from "@hktekno/ui/lib/date";

type Job = inferData<typeof k.job.all>["data"][number];
const colHelper = createColumnHelper<Job>();

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
      <div className="flex flex-wrap items-center justify-end">
        <Paginate />
        <PaginationParams meta={jobs?.meta} />
      </div>
    </>
  );
};

export default ListJobs;
