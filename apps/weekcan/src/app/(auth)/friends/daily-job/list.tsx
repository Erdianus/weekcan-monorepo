"use client";

import type { CellContext } from "@tanstack/react-table";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { atom, useAtom } from "jotai";
import { MoreHorizontal, Pencil, Plus } from "lucide-react";
import { toast } from "sonner";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import { dailyicon } from "@hktekno/ui/components/icon/daily-status-time";
import Loading from "@hktekno/ui/components/loading";
import Paginate from "@hktekno/ui/components/paginate";
import PaginationParams from "@hktekno/ui/components/pagination-params";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { Button } from "@hktekno/ui/components/ui/button";
import { DrawerDialog } from "@hktekno/ui/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
import { Input } from "@hktekno/ui/components/ui/input";
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
import useUserStore from "@hktekno/ui/lib/store/useUserStore";
import { cn } from "@hktekno/ui/lib/utils";

import Filter from "./filter";
import { FormDailyJob } from "./form";

type DailyJobUser = inferData<typeof k.company.daily_job.users>["data"][number];
const colHelper = createColumnHelper<DailyJobUser>();

const stateAtom = atom<{ user?: DailyJobUser }>({ user: undefined });

const Point = ({ getValue, row }: CellContext<DailyJobUser, number>) => {
  const role = useUserStore((s) => s.role);
  const isRoled = ["Admin", "Owner", "HRD", "Manager"].includes(role ?? "");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const client = useQueryClient();
  const update = k.company.daily_job.updatePoint.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.company.daily_job.users.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = `${getValue()}`;
    }
  }, [getValue()]);

  return (
    <Input
      ref={inputRef}
      defaultValue={getValue()}
      disabled={!isRoled}
      type="number"
      className="w-min"
      onBlur={(e) => {
        const point = e.target.value;
        if (isRoled && `${getValue()}` !== `${point}`) {
          update.mutate({
            data: { user_id: row.original.id, point },
          });
        }
      }}
    />
  );
};

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
    cell: ({ getValue, row }) => {
      return (
        <Link className="underline" href={`/employee/${row.original.id}`}>
          {getValue()}
        </Link>
      );
    },
  }),
  colHelper.accessor("jobTypes", {
    header: "Jabatan",
    cell: ({ getValue }) => {
      if (!getValue().length) return "-";
      return (
        <div className="flex max-w-52 flex-wrap items-center gap-4 text-xs">
          {getValue().map((v) => (
            <Badge key={`job--${v.id}`} variant={"secondary"}>
              {v.job_name}
            </Badge>
          ))}
        </div>
      );
    },
  }),

  colHelper.accessor("dailyJob", {
    header: "Kerjaan",
    cell: ({ getValue }) => {
      if (!getValue()?.length) return "-";
      return (
        <>
          {getValue()?.map((v) => {
            const Icon = dailyicon[v.status];
            return (
              <div
                key={`dailyy-${v.id}`}
                className={cn(
                  "mb-2.5 flex items-start gap-1 rounded border p-0.5",
                  v.status === "Pagi" &&
                    "border-yellow-300 dark:border-yellow-800",
                  v.status === "Siang" && "border-sky-300 dark:border-sky-800",
                  v.status === "Sore" &&
                    "border-orange-300 dark:border-orange-800",
                  v.status === "Malam" &&
                    "border-purple-300 dark:border-purple-800",
                )}
              >
                <div className="flex flex-col items-center gap-1">
                  {Icon && (
                    <Icon width={24} height={24} className="min-h-6 min-w-6" />
                  )}
                  <p className="text-xs text-muted-foreground">
                    {v.time.slice(0, 5)}
                  </p>
                </div>

                <p className="">{v.text}</p>
              </div>
            );
          })}
        </>
      );
    },
  }),
  colHelper.accessor("point", {
    header: "Point",
    cell: Point,
  }),
  colHelper.display({
    id: "actions",
    cell: Action,
  }),
];

const ListDailyJobUser = ({ role }: { role?: string }) => {
  const user_id = useUserStore((s) => s.id);
  const isRoled = ["Admin", "Owner", "HRD", "Manager"].includes(role ?? "");

  const [state, setState] = useAtom(stateAtom);
  const company_id = useUserStore((s) => `${s.friends_id}`);
  const searchParams = useSearchParams();
  const job_type = searchParams.getAll("job_type");
  const job_types = job_type.length > 0 ? { job_type } : {};
  const variables = Object.fromEntries(searchParams.entries());

  const { data: dailies, isLoading } = k.company.daily_job.users.useQuery({
    variables: { ...variables, ...job_types, company_id },
  });

  const table = useReactTable({
    data: dailies?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {isRoled && (
        <DrawerDialog
          title={state.user?.name}
          description={state.user?.jobType?.job_name}
          open={!!state.user}
          onOpenChange={(open) => {
            if (!open) {
              setState({ user: undefined });
            }
          }}
        >
          {state.user && <FormDailyJob user_id={state.user.id} />}
        </DrawerDialog>
      )}
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">Tugas Harian</H3>
        <Button type="button" size={"icon"} asChild>
          <Link href="/friends/daily-job/form">
            <Plus />
          </Link>
        </Button>
      </div>
      <PortalSearch placeholder="Cari Tugas Harian..." />
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <Filter isLoading={isLoading} />
      </div>
      {/* <DataTable table={table} columns={columns} isloading={isLoading} /> */}
      <div className="rounded-md border">
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
                      "cursor-pointer hover:bg-accent",
                      row.original.id === state.user?.id && "bg-main-500",
                    )}
                    onDoubleClick={() => {
                      if (`${row.original.id}` === `${user_id}` || isRoled) {
                        setState({ user: row.original });
                      }
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
      </div>
      <div className="mt-4 flex w-full items-center justify-end gap-2">
        <Paginate />
        <PaginationParams meta={dailies?.meta} />
      </div>
    </>
  );
};

export default ListDailyJobUser;
