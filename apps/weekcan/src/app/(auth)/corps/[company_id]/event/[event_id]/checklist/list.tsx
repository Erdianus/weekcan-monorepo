"use client";

import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import { Button } from "@hktekno/ui/components/ui/button";
import { DataTable } from "@hktekno/ui/components/ui/data-table";
import Spinner from "@hktekno/ui/components/ui/spinner";

type Check = inferData<
  typeof k.event.list_job
>["pages"][number]["data"][number];
const colHelper = createColumnHelper<Check>();

const columns = [
  colHelper.display({
    header: "No",
    cell: ({ row }) => row.index + 1,
  }),
  colHelper.accessor("name", {
    header: "Nama",
  }),
  colHelper.accessor("jabatan", {
    header: "Jabatan",
  }),
  colHelper.accessor("jobNoProgress", {
    header: () => (
      <div className="text-gray-600 dark:text-gray-400">No Progress</div>
    ),
  }),
  colHelper.accessor("jobKoordinasi", {
    header: () => (
      <div className="text-yellow-600 dark:text-yellow-400">Koordinasi</div>
    ),
  }),
  colHelper.accessor("jobKonfirmasi", {
    header: () => <div className="text-orange-600 dark:text-orange-400">Konfirmasi</div>,
  }),
  colHelper.accessor("jobLoading", {
    header: () => <div className="text-blue-600 dark:text-blue-400">Loading</div>,
  }),
  colHelper.accessor("jobDone", {
    header: () => <div className="text-green-600 dark:text-green-400">Done</div>,
  }),
  colHelper.accessor("jobCancel", {
    header: () => <div className="text-red-600 dark:text-red-400">Cancel</div>,
  }),
];

const CheckList = () => {
  const params = useParams<{ event_id: string }>();
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    k.event.list_job.useInfiniteQuery({
      variables: {
        event_id: params.event_id,
        params: variables,
      },
    });

  const datas = useMemo(() => {
    let d: Check[] = [];

    data?.pages.forEach((page) => {
      d = [...page.data, ...d];
    });

    return d;
  }, [data]);

  const table = useReactTable({
    data: datas,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <DataTable table={table} columns={columns} isloading={isLoading} />
      <div className="flex flex-wrap items-center justify-center">
        {hasNextPage && (
          <Button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage && <Spinner />}
            <span>Tampilkan Lebih</span>
          </Button>
        )}
      </div>
    </>
  );
};

export default CheckList;
