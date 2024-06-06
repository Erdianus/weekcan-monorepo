"use client";

import { useParams, useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CloudSun, Moon, Sun } from "lucide-react";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import Paginate from "@hktekno/ui/components/paginate";
import PaginationParams from "@hktekno/ui/components/pagination-params";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { Badge } from "@hktekno/ui/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@hktekno/ui/components/ui/carousel";
import { DataTable } from "@hktekno/ui/components/ui/data-table";

type DailyJobUser = inferData<typeof k.company.daily_job.users>["data"][number];
const colHelper = createColumnHelper<DailyJobUser>();

const columns = [
  colHelper.display({
    header: "No",
    cell: ({ row }) => row.index + 1,
  }),
  colHelper.accessor("name", {
    header: "Nama",
  }),
  colHelper.accessor("jobType.job_name", {
    header: "Jabatan",
    cell: ({ getValue }) => (getValue() ? getValue() : "-"),
  }),
  colHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue, row }) => {
      if (getValue() === "Hadir" && row.original.time)
        return (
          <p className="font-semibold text-green-500">{row.original.time}</p>
        );
      return <Badge variant={getValue()}>{getValue()}</Badge>;
    },
  }),
  colHelper.accessor("dailyJob", {
    header: "Kerjaan",
    cell: ({ getValue }) => {
      if (!getValue()?.length) return "-";
      return (
        <Carousel
          opts={{ loop: true, align: "center" }}
          className="relative"
          orientation="vertical"
        >
          <CarouselContent className="h-14 py-1">
            {getValue()?.map((v) => (
              <CarouselItem key={`status-${v.id}`} className="">
                <div className="flex h-10 items-center gap-2 whitespace-nowrap rounded border px-2">
                  {v.status === "Pagi" && <CloudSun />}
                  {v.status === "Siang" && <Sun />}
                  {v.status === "Malam" && <Moon />}
                  {v.text}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/*@ts-expect-error gapapan gan error*/}
          {getValue()?.length > 1 && (
            <div className="absolute -right-2 top-0 flex flex-col items-center justify-center">
              <CarouselPrevious className="static h-6 w-6" />
              <CarouselNext className="static h-6 w-6" />
            </div>
          )}
        </Carousel>
      );
    },
  }),
];

const ListDailyJobUser = () => {
  const { company_id } = useParams<{ company_id: string }>();
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());

  const { data: dailies, isLoading } = k.company.daily_job.users.useQuery({
    variables: { ...variables, company_id },
  });

  const table = useReactTable({
    data: dailies?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <PortalSearch placeholder="Cari Tugas Harian..." />
      <DataTable table={table} columns={columns} isloading={isLoading} />
      <div className="mt-4 flex w-full items-center justify-end gap-2">
        <Paginate />
        <PaginationParams meta={dailies?.meta} />
      </div>
    </>
  );
};

export default ListDailyJobUser;
