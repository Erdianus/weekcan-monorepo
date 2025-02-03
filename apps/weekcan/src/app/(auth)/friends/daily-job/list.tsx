"use client";

import type { CellContext } from "@tanstack/react-table";
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

import type { inferData, inferVariables } from "@hktekno/api";
import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import { dailyicon } from "@hktekno/ui/components/icon/daily-status-time";
import Loading from "@hktekno/ui/components/loading";
import Paginate from "@hktekno/ui/components/paginate";
import PaginationParams from "@hktekno/ui/components/pagination-params";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { Button } from "@hktekno/ui/components/ui/button";
import { DrawerDialog } from "@hktekno/ui/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
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
  /* colHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue, row }) => {
      if (getValue() === "Hadir" && row.original.time)
        return (
          <p className="font-semibold text-green-500">{row.original.time}</p>
        );
      return <Badge variant={getValue()}>{getValue()}</Badge>;
    },
  }), */
  colHelper.accessor("dailyJob", {
    header: "Kerjaan",
    cell: ({ getValue }) => {
      if (!getValue()?.length) return "-";
      return (
        <>
          {getValue()?.map((v) => {
            const Icon = dailyicon[v.status];
            return (
              <div className="mb-0.5 flex items-center gap-1">
                {Icon && <Icon width={18} height={18} />}
                <p className="">{v.text}</p>
                <p className="text-xs text-muted-foreground">
                  {v.time.slice(0, 5)}
                </p>
              </div>
            );
          })}
        </>
      );
    },
  }),
  /* colHelper.accessor("location_text", {
    header: "Lokasi",
    cell: ({ getValue }) => (getValue() ? getValue() : "-"),
  }), */
  /* colHelper.accessor("ket", {
    header: "Keterangan",
    cell: ({ getValue }) => (getValue() ? getValue() : "-"),
  }), */
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
  const variables = Object.fromEntries(searchParams.entries());

  const { data: dailies, isLoading } = k.company.daily_job.users.useQuery({
    variables: { ...variables, company_id },
  });

  const { data: daily } = k.company.daily_job.single.useQuery({
    variables: { user_id },
  });

  const client = useQueryClient();
  const create = k.company.daily_job.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.company.daily_job.users.getKey(),
      });
      setState({ user: undefined });
    },
    onError: ({ message }) => toast.error(message),
  });

  const update = k.company.daily_job.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.company.daily_job.users.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
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
          {state.user && (
            <FormDailyJob
              user_id={state.user.id}
              defaultValues={state.user}
              onSubmitAction={(v) => {
                const isUpdate =
                  state.user?.dailyJob && state.user?.dailyJob?.length > 0;

                const data: inferVariables<
                  typeof k.company.daily_job.create
                >["data"] = {
                  user_id: `${state.user?.id}`,
                  date: dayjs().format("YYYY-MM-DD"),
                  daily_jobs: v.daily_jobs,
                };

                if (isUpdate) {
                  update.mutate({
                    id: `${state.user?.id}`,
                    data,
                  });
                  return;
                }

                create.mutate({
                  data,
                });
              }}
              isPending={create.isPending || update.isPending}
            />
          )}
        </DrawerDialog>
      )}
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">Tugas Harian</H3>
        <Button
          type="button"
          size={"icon"}
          onClick={() => {
            setState({ user: daily });
          }}
        >
          <Plus />
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
