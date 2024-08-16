"use client";

import type { CellContext } from "@tanstack/react-table";
import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  CloudSun,
  Moon,
  MoreHorizontal,
  Pencil,
  Plus,
  Sun,
} from "lucide-react";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { Button } from "@hktekno/ui/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@hktekno/ui/components/ui/carousel";
import { DataTable } from "@hktekno/ui/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
import Spinner from "@hktekno/ui/components/ui/spinner";
import useUserStore from "@hktekno/ui/lib/store/useUserStore";

import Filter from "./filter";

type DailyJobUser = inferData<typeof k.company.daily_job.users>["data"][number];
const colHelper = createColumnHelper<DailyJobUser>();

const Action = ({ row }: CellContext<DailyJobUser, unknown>) => {
  const user_id = useUserStore((s) => s.id);
  const { original: data } = row;

  if (`${user_id}` !== `${row.original.id}`) return null;

  if (
    row.original.date &&
    !dayjs().isSame(dayjs(row.original.date), "day") &&
    row.original.status === "Belum Hadir"
  )
    return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            {<MoreHorizontal className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {data.status === "Belum Hadir" && (
            <Link href={`daily-job/create`}>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>Buat</span>
              </DropdownMenuItem>
            </Link>
          )}
          {data.status !== "Belum Hadir" && (
            <Link href={`daily-job/update`}>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
            </Link>
          )}
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
        <>
          <Carousel
            opts={{ loop: true, align: "center" }}
            className="relative pr-6 md:pr-0"
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
        </>
      );
    },
  }),
  colHelper.accessor("location_text", {
    header: "Lokasi",
    cell: ({ getValue }) => (getValue() ? getValue() : "-"),
  }),
  colHelper.accessor("ket", {
    header: "Keterangan",
    cell: ({ getValue }) => (getValue() ? getValue() : "-"),
  }),
  colHelper.display({
    id: "actions",
    cell: Action,
  }),
];

const ListDailyJobUser = () => {
  const company_id = useUserStore((s) => `${s.friends_id}`);
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    k.company.daily_job.userInfinity.useInfiniteQuery({
      variables: { ...variables, company_id },
    });

  const dailies = useMemo(() => {
    let d: DailyJobUser[] = [];

    data?.pages.forEach((page) => {
      d = [...page.data, ...d];
    });

    return d;
  }, [data]);

  /*   const { data: dailies, isLoading } = k.company.daily_job.users.useQuery({
    variables: { ...variables, company_id },
  }); */

  const table = useReactTable({
    data: dailies,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <PortalSearch placeholder="Cari Tugas Harian..." />
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <Filter isLoading={isLoading} />
      </div>
      <DataTable table={table} columns={columns} isloading={isLoading} />
      <div className="mt-4 w-full items-center justify-center">
        {hasNextPage && (
          <Button
            type="button"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage && <Spinner />}
            <span>Tampilkan Lebih</span>
          </Button>
        )}
      </div>
      {/* <div className="mt-4 flex w-full items-center justify-end gap-2">
        <Paginate />
        <PaginationParams meta={dailies?.meta} />
      </div> */}
    </>
  );
};

export default ListDailyJobUser;
