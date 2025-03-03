"use client";

import { useSearchParams } from "next/navigation";
import {
    CellContext,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";

import { inferData, k } from "@hktekno/api";
import Paginate from "@hktekno/ui/components/paginate";
import PaginationParams from "@hktekno/ui/components/pagination-params";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { DataTable } from "@hktekno/ui/components/ui/data-table";
import useAlertStore from "@hktekno/ui/lib/store/useAlertStore";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@hktekno/ui/components/ui/button";
import Link from "next/link";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Spinner from "@hktekno/ui/components/ui/spinner";

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
  const { data, isLoading } = k.vendor.all.useQuery({ variables });

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <PortalSearch placeholder="Cari Vendor..." />
      <DataTable table={table} isloading={isLoading} columns={columns} />
      <div className="mt-4 flex w-full items-center justify-end gap-5">
        <Paginate />
        <PaginationParams meta={data?.meta} />
      </div>
    </>
  );
}
