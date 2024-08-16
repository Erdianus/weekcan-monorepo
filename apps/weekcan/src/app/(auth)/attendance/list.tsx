"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { atom, useAtom, useSetAtom } from "jotai";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import { FilterContainer } from "@hktekno/ui/components/filter-container";
import { LightBox } from "@hktekno/ui/components/lightbox";
import Paginate from "@hktekno/ui/components/paginate";
import { PaginationMore } from "@hktekno/ui/components/pagination-params";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { DataTable } from "@hktekno/ui/components/ui/data-table";
import { Muted } from "@hktekno/ui/components/ui/typograhpy";

import FilterAttendance from "./filter";

type Attendance = inferData<
  typeof k.attendance.all
>["data"][number]["attendances"][number];

const colHelper = createColumnHelper<Attendance>();

const openAtom = atom(false);

const columns = [
  colHelper.display({
    header: "No",
    cell: ({ row }) => row.index + 1,
  }),
  colHelper.accessor("name", {
    header: "Nama",
    cell: ({ getValue, row }) => {
      const setOpen = useSetAtom(openAtom);
      return (
        <div className="flex items-center gap-3">
          <img
            onClick={() => setOpen(true)}
            className="h-8 w-8"
            src={row.original.picture_link}
          />
          <div>{getValue()}</div>
        </div>
      );
    },
  }),
  colHelper.accessor("time", {
    header: "Jam",
  }),
  colHelper.accessor("status", {
    header: "In/Out",
    cell: ({ getValue }) => <Badge variant={getValue()}>{getValue()}</Badge>,
  }),
  colHelper.display({
    header: "Lat,Lon",
    cell: ({ row: { original: data } }) =>
      `${data.latitude}, ${data.longitude}`,
  }),
  colHelper.accessor("location_text", {
    header: "Location",
    cell: ({ getValue }) => (
      <div className="whitespace-nowrap">{getValue()}</div>
    ),
  }),
];

const TableAttendance = ({
  data,
  isLoading,
}: {
  data: Attendance[];
  isLoading: boolean;
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <DataTable table={table} columns={columns} isloading={isLoading} />
    </>
  );
};

const ListAttendance = () => {
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const { data, isLoading } = k.attendance.all.useQuery({ variables });
  const [open, setOpen] = useAtom(openAtom);

  const slides = useMemo(() => {
    const slides: { src: string }[] = [];

    data?.data.forEach((d) => {
      d.attendances.forEach((attend) => {
        slides.push({
          src: attend.picture_link,
        });
      });
    });

    return slides;
  }, [data]);

  return (
    <>
      <LightBox slides={slides} open={open} close={() => setOpen(false)} />
      <FilterContainer>
        <FilterAttendance isLoading={isLoading} />
      </FilterContainer>
      {data?.data.map((d) => (
        <div className="mb-8">
          <div className="mb-1 flex items-center gap-1">
            <Muted>{dayjs(d.tanggal).format("DD MMMM YYYY")}</Muted>
          </div>
          <TableAttendance data={d.attendances} isLoading={isLoading} />
        </div>
      ))}
      <div className="mt-4 flex w-full items-center justify-end gap-2">
        <Paginate />
        <PaginationMore meta={data?.meta} />
      </div>
    </>
  );
};

export default ListAttendance;
