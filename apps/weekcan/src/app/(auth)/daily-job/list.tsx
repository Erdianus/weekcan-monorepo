"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { Plus } from "lucide-react";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import Loading from "@hktekno/ui/components/loading";
import { Button } from "@hktekno/ui/components/ui/button";
import { DataTable } from "@hktekno/ui/components/ui/data-table";
import { Separator } from "@hktekno/ui/components/ui/separator";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { H3, Muted } from "@hktekno/ui/components/ui/typograhpy";
import useUserStore from "@hktekno/ui/lib/store/useUserStore";

import FilterDailyJob from "./filter";

type DailyJob = inferData<typeof k.dailyJob.byDate>["data"][number][number];
const colHelper = createColumnHelper<DailyJob>();

const columns = [
  colHelper.display({
    header: "No",
    cell: ({ row }) => row.index + 1,
  }),
  colHelper.accessor("text", {
    header: "Kerjaan",
  }),
  colHelper.accessor("status", {
    header: "Waktu",
  }),
];

const TableDailyJobs = ({ data }: { data?: DailyJob[] }) => {
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <DataTable table={table} columns={columns} isloading={false} />
    </>
  );
};

const ListDailyJobs = () => {
  const searchParams = useSearchParams();
  const user_id = useUserStore((s) => s.id);

  const variables = Object.fromEntries(searchParams.entries());

  const { data: dailyJobs, isLoading } = k.dailyJob.byDate.useQuery({
    variables: {
      ...variables,
      user_id: `${user_id}`,
    },
  });

  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">Tugas Harian</H3>
        <Button type="button" size={"icon"} asChild>
          <Link href={"attendance/create"}>
            <Plus />
          </Link>
        </Button>
      </div>
      <div className="mb-4 flex flex-wrap gap-4">
        <FilterDailyJob isLoading={isLoading} />
      </div>
      <Flashlist
        isloading={isLoading}
        loading={<Spinner />}
        isfallback={Array.isArray(dailyJobs?.data)}
        fallback={<div>Tidak Ada Tugas</div>}
      >
        {Object.keys(dailyJobs?.data ?? {}).map((date) => (
          <div className="mb-8" key={`date-${date}`}>
            <div className="mb-1 flex items-center gap-1">
              <Muted>{dayjs(date).format("DD MMMM YYYY")}</Muted>
              <Separator className="flex-1" />
            </div>
            <TableDailyJobs data={dailyJobs?.data[date]} />
          </div>
        ))}
      </Flashlist>
    </>
  );
};

export default ListDailyJobs;
