"use client";

import type { CellContext } from "@tanstack/react-table";
import { useEffect } from "react";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { Eye, MoreHorizontal, Plus } from "lucide-react";
import { toast } from "sonner";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import Loading from "@hktekno/ui/components/loading";
import Paginate from "@hktekno/ui/components/paginate";
import PaginationParams from "@hktekno/ui/components/pagination-params";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { Select, SelectAsync } from "@hktekno/ui/components/select";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { Button } from "@hktekno/ui/components/ui/button";
import { DateRangePicker } from "@hktekno/ui/components/ui/date-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
import { Separator } from "@hktekno/ui/components/ui/separator";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@hktekno/ui/components/ui/table";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import { date4Y2M2D, dateRange } from "@hktekno/ui/lib/date";
import { loadUserOptions, optionsEventStatus } from "@hktekno/ui/lib/select";
import { cn } from "@hktekno/ui/lib/utils";

import { FormEvent } from "./form";
import { currEventAtom, openAtom } from "./state";

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
          <Link href={`/friends/event/${data.slug}/list-jobs`}>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              <span>Rincian</span>
            </DropdownMenuItem>
          </Link>
          {/* <Link href={`/friends/event/${data.slug}/checklist`}>
            <DropdownMenuItem>
              <Task className="mr-2 h-4 w-4" />
              <span>Checklist</span>
            </DropdownMenuItem>
          </Link> */}
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
    header: "Nama Event",
    cell: ({ getValue, row }) => {
      const { slug } = row.original;
      return (
        <Link className="underline" href={`event/${slug}/list-jobs`}>
          {getValue()}
        </Link>
      );
    },
  }),
  colHelper.accessor("event_type", {
    header: "Tipe Event",
  }),
  colHelper.display({
    header: "Tanggal",
    cell: ({ row }) =>
      dateRange(row.original.start_date, row.original.end_date),
  }),
  colHelper.accessor("venue", {
    header: "Tempat",
    cell: ({ getValue }) => (
      <div className="max-w-xs truncate">{`${getValue()}`}</div>
    ),
  }),
  colHelper.accessor("client", {
    header: "Client",
  }),
  colHelper.accessor("all_pic", {
    header: "Koor.",
  }),
  colHelper.accessor("all_pic_design", {
    header: "Design",
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

export default function ListEvent({ role }: { role?: string }) {
  const isRoled = ["Admin", "Owner", "HRD", "Manager"].includes(role ?? "");
  const [currEvent, setCurrEvent] = useAtom(currEventAtom);
  const [, setOpen] = useAtom(openAtom);
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = k.event.all.useQuery({
    variables: {
      ...variables,
    },
    retryOnMount: false,
    // enabled: false,
  });

  const table = useReactTable({
    data: events?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // const isLoading = false;
  // const isload = !events && isLoading;

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
      throw new Error(`Error dari Backend 😱`);
    }
  }, [isError, error]);

  return (
    <>
      <FormEvent
      // title="Buat Event Baru"
      /* open={open}
        onOpenChange={(e) => {
          setOpen(e);
        }} */
      />
      <PortalSearch placeholder="Cari Event..." />
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">Event</H3>
        <Button
          onClick={() => {
            setOpen(true);
            setCurrEvent(undefined);
          }}
          size={"icon"}
          type="button"
        >
          <Plus />
        </Button>
      </div>
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          Filter
          <Separator className="flex-1" />
        </div>
        <div className="flex flex-wrap gap-4">
          <Filter isLoading={isLoading} />
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <Flashlist
            isloading={isLoading}
            loading={
              <Loading keyname="loadingtable">
                <TableRow>
                  {columns.map((_, i) => (
                    <TableCell key={`cellloading-${i}`}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              </Loading>
            }
            isfallback={table.getRowModel().rows.length === 0}
            fallback={
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            }
          >
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={`roww-${row.id}`}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "hover:bg-accent",
                    row.original.id === currEvent?.id && "bg-main-500",
                  )}
                  onDoubleClick={() => {
                    if (!isRoled) return;
                    setOpen(true);
                    setCurrEvent(row.original);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={`cell--${cell.id}`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </Flashlist>
        </TableBody>
      </Table>
      <div className="mt-4 flex w-full items-center justify-end gap-2">
        <Paginate />
        <PaginationParams meta={events?.meta} />
      </div>
    </>
  );
}

const eventStatus = [{ label: "All", value: "All" }, ...optionsEventStatus()];
const Filter = ({ isLoading }: { isLoading: boolean }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ company_id: string }>();
  return (
    <>
      <SelectAsync
        instanceId={"pic_filter"}
        className="w-auto"
        value={
          searchParams.get("pic_id")
            ? {
                label: searchParams.get("pic_name")?.toString(),
                value: searchParams.get("pic_id")?.toString(),
              }
            : null
        }
        isClearable
        placeholder="Koordinator Event"
        loadOptions={loadUserOptions}
        additional={{
          page: 1,
          company_id: [params.company_id],
        }}
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const params = new URLSearchParams(searchParams);

          if (e) {
            params.set("pic_id", `${e.value}`);
            params.set("pic_name", `${e.label}`);
          } else {
            params.delete("pic_id");
            params.delete("pic_name");
          }

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />

      <Select
        instanceId={"event_status_filter"}
        className="w-auto"
        options={eventStatus}
        defaultValue={
          searchParams.get("status")
            ? {
                label: searchParams.get("status"),
                value: searchParams.get("status"),
              }
            : null
        }
        isClearable
        isDisabled={isLoading}
        placeholder="Status Event"
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const params = new URLSearchParams(searchParams);

          if (e) {
            params.set("status", `${e.value}`);
          } else {
            params.delete("status");
          }

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
      <DateRangePicker
        mode="range"
        defaultMonth={dayjs(searchParams.get("from") ?? undefined).toDate()}
        disabled={isLoading}
        value={
          searchParams.get("from")
            ? {
                from: dayjs(searchParams.get("from")).toDate(),
                to: searchParams.get("to")
                  ? dayjs(searchParams.get("to")).toDate()
                  : undefined,
              }
            : undefined
        }
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const params = new URLSearchParams(searchParams);

          if (e?.from) params.set("from", `${date4Y2M2D(e.from)}`);
          if (e?.to) params.set("to", `${date4Y2M2D(e.to)}`);

          if (!e?.from) params.delete("from");
          if (!e?.to) params.delete("to");

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
    </>
  );
};
