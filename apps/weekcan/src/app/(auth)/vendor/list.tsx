"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  CellContext,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { inferData, k } from "@hktekno/api";
import Paginate from "@hktekno/ui/components/paginate";
import PaginationParams from "@hktekno/ui/components/pagination-params";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { SelectAsync } from "@hktekno/ui/components/select";
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
import { Separator } from "@hktekno/ui/components/ui/separator";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { loadCityOptions, loadProvinceOptions } from "@hktekno/ui/lib/select";
import useAlertStore from "@hktekno/ui/lib/store/useAlertStore";

type Vendor = inferData<typeof k.vendor.all>["data"][0];

const colHelper = createColumnHelper<Vendor>();

const Actions = ({ row }: CellContext<Vendor, unknown>) => {
  const alert = useAlertStore();

  const { original: data } = row;

  const client = useQueryClient();
  const del = k.vendor.delete.useMutation({
    async onSuccess({ message }) {
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.vendor.all.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });

  const isload = del.isPending;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            {isload ? <Spinner /> : <MoreHorizontal className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Link href={`/vendor/${data.slug}/update`}>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            onClick={() =>
              alert.setData({
                open: true,
                confirmText: "Ya, Hapus",
                onConfirm: () => {
                  del.mutate({ slug: data.slug });
                },
              })
            }
            className="hover:bg-red-500 dark:hover:bg-red-900 dark:hover:text-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Hapus</span>
          </DropdownMenuItem>
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
    cell: ({ getValue, row }) => (
      <Link href={`vendor/${row.original.slug}`} className="underline">
        {getValue()}
      </Link>
    ),
  }),
  colHelper.accessor("no_tlp", {
    header: "No. Telp/HP",
  }),
  colHelper.accessor("email", {
    header: "Email",
  }),
  colHelper.accessor("address", {
    header: "Alamat",
  }),
  colHelper.display({
    header: "Kota,Provinsi",
    cell: ({ row }) =>
      row.original.city
        ? `${row.original.city}, ${row.original.province}`
        : "-",
  }),
  colHelper.accessor("item_vendor", {
    header: "Item Vendor",
    cell: ({ getValue }) => {
      if (!getValue().length) return "-";

      return (
        <div className="flex items-center gap-4">
          {getValue()[0]?.name}
          {getValue().length > 1 && (
            <Badge variant={"secondary"}>{getValue().length - 1}+</Badge>
          )}
        </div>
      );
    },
  }),
  colHelper.display({
    id: "action",
    cell: Actions,
  }),
];

export function ListVendor() {
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const { data, isLoading } = k.vendor.all.useQuery({
    variables: {
      search: variables.search,
      page: variables.page,
      paginate: variables.paginate,
      city: variables.citylabel,
    },
  });

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <PortalSearch placeholder="Cari Vendor..." />
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          Filter
          <Separator className="flex-1" />
        </div>
        <div className="flex flex-wrap gap-4">
          <Filter isLoading={isLoading} />
        </div>
      </div>

      <DataTable table={table} isloading={isLoading} columns={columns} />
      <div className="mt-4 flex w-full items-center justify-end gap-5">
        <Paginate />
        <PaginationParams meta={data?.meta} />
      </div>
    </>
  );
}

const Filter = ({ isLoading }: { isLoading: boolean }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <SelectAsync
        instanceId={"f-province"}
        className="w-auto  min-w-60"
        loadOptions={loadProvinceOptions}
        defaultValue={
          searchParams.get("provid")
            ? {
                label: searchParams.get("provlabel") ?? "",
                value: searchParams.get("provid") ?? "",
              }
            : null
        }
        isClearable
        additional={{
          page: 1,
        }}
        isDisabled={isLoading}
        placeholder="Provinsi"
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const params = new URLSearchParams(searchParams);
          params.delete("cityid");
          params.delete("citylabel");
          if (e) {
            params.set("provid", `${e.value}`);
            params.set("provlabel", `${e.label}`);
          } else {
            params.delete("provid");
            params.delete("provlabel");
          }

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
      <SelectAsync
        instanceId={"f-city"}
        className="w-auto min-w-60"
        loadOptions={loadCityOptions}
        additional={{
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          province_id: searchParams.get("provid") ?? "",
          page: 1,
        }}
        value={
          searchParams.get("cityid")
            ? {
                label: searchParams.get("citylabel") ?? "",
                value: searchParams.get("cityid") ?? "",
              }
            : null
        }
        isClearable
        isDisabled={isLoading || !searchParams.get("provid")}
        placeholder="Kota"
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const params = new URLSearchParams(searchParams);

          if (e) {
            params.set("cityid", `${e.value}`);
            params.set("citylabel", `${e.label}`);
          } else {
            params.delete("cityid");
            params.delete("citylabel");
          }

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
    </>
  );
};
