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
import {
  CloudSun,
  Moon,
  MoreHorizontal,
  Pencil,
  Plus,
  Sun,
} from "lucide-react";
import { toast } from "sonner";

import type { inferData, inferVariables } from "@hktekno/api";
import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import Loading from "@hktekno/ui/components/loading";
import Paginate from "@hktekno/ui/components/paginate";
import PaginationParams from "@hktekno/ui/components/pagination-params";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { Button } from "@hktekno/ui/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@hktekno/ui/components/ui/carousel";
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
  const isRoled = ["Admin", "Owner", "HRD", "Manager"].includes(role ?? "");

  const [state, setState] = useAtom(stateAtom);
  const company_id = useUserStore((s) => `${s.friends_id}`);
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());

  const { data: dailies, isLoading } = k.company.daily_job.users.useQuery({
    variables: { ...variables, company_id },
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

  const update = k.company.daily_job.update.attendance.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.company.daily_job.userInfinity.getKey(),
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
              onFormSubmit={(v) => {
                const isUpdate =
                  state.user?.status.toLowerCase() !== "belum hadir";
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
                      "hover:bg-accent",
                      row.original.id === state.user?.id && "bg-main-500",
                    )}
                    onDoubleClick={() => {
                      if (!isRoled) return;
                      setState({ user: row.original });
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
