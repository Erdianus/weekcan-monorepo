"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CellContext,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { atom, useAtom, useSetAtom } from "jotai";
import { Check, Copy, MapPinned, MoreHorizontal } from "lucide-react";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import { FilterContainer } from "@hktekno/ui/components/filter-container";
import { LightBox } from "@hktekno/ui/components/lightbox";
import Paginate from "@hktekno/ui/components/paginate";
import { PaginationMore } from "@hktekno/ui/components/pagination-params";
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
import { Muted } from "@hktekno/ui/components/ui/typograhpy";
import { getDMS } from "@hktekno/ui/lib/utils";

import FilterAttendance from "./filter";

type Attendance = inferData<
  typeof k.attendance.all
>["data"][number]["attendances"][number];

const colHelper = createColumnHelper<Attendance>();

const openAtom = atom(false);

const Action = ({ row }: CellContext<Attendance, unknown>) => {
  const [isCopied, setIsCopied] = useState(false);
  const { latitude, longitude } = row.original;
  const dms = getDMS(Number(latitude), Number(longitude)).join("+");
  // This is the function we wrote earlier
  async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(`${latitude},${longitude}`)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isCopied}>
          <Button variant="ghost" className="h-8 w-8 p-0" disabled={isCopied}>
            <span className="sr-only">Open menu</span>
            {isCopied ? <Check /> : <MoreHorizontal className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleCopyClick}>
            <Copy className="mr-2 h-4 w-4" />
            <span>Salin Lat/Long</span>
          </DropdownMenuItem>

          <a
            target="_blank"
            href={`https://www.google.com/maps/search/${latitude},${longitude}/@${latitude},${longitude}`}
          >
            <DropdownMenuItem>
              <MapPinned className="mr-2 h-4 w-4" />
              <span>Lihat di Gmap</span>
            </DropdownMenuItem>
          </a>
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
  colHelper.display({
    id: "actions",
    cell: Action,
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
