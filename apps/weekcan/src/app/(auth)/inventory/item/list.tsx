"use client";

import type { CellContext } from "@tanstack/react-table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { Database, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import Paginate from "@hktekno/ui/components/paginate";
import PaginationParams from "@hktekno/ui/components/pagination-params";
import PortalSearch from "@hktekno/ui/components/portal-search";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { Button } from "@hktekno/ui/components/ui/button";
import { DataTable } from "@hktekno/ui/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
import Spinner from "@hktekno/ui/components/ui/spinner";
import useAlertStore from "@hktekno/ui/lib/store/useAlertStore";

type Item = inferData<typeof k.inventory.item.all>["data"][number];
const colHelper = createColumnHelper<Item>();

const Actions = ({ row }: CellContext<Item, unknown>) => {
  const alert = useAlertStore();
  const client = useQueryClient();
  const { original: data } = row;
  const del = k.inventory.item.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.inventory.item.all.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });
  const isload = del.isPending && `${del.variables.id}` === `${data.id}`;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isload}>
          <Button
            disabled={isload}
            type="button"
            variant={"ghost"}
            size={"icon"}
          >
            {isload ? <Spinner /> : <MoreHorizontal size={16} />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href={`/inventory/item/${data.id}`}>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              <span>Detail</span>
            </DropdownMenuItem>
          </Link>
          <Link href={`/inventory/item/${data.id}/update`}>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className="hover:bg-red-500 dark:hover:bg-red-900 dark:hover:text-red-50"
            onClick={() => {
              alert.setData({
                open: true,
                confirmText: "Ya, Hapus",
                header: `Yakin ingin mengapus '${data.name}'?`,
                desc: "Barang yang dihapus tidak dapat dikembalikan lagi",
                onConfirm: () => {
                  del.mutate({ id: `${data.id}` });
                },
              });
            }}
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
  colHelper.accessor("picture_link", {
    header: "Gambar",
    cell: ({ getValue }) => (
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage className="h-8 w-8 object-cover" src={getValue()} />
        <AvatarFallback>😆</AvatarFallback>
      </Avatar>
    ),
  }),
  colHelper.accessor("name", {
    header: "Nama",
    cell: ({ getValue, row }) => (
      <div className="flex items-center gap-1">
        {getValue()}
        {row.original.category === "Server" && (
          <Database size={16} className="text-muted-foreground" />
        )}
      </div>
    ),
  }),
  colHelper.display({
    header: "Jumlah",
    cell: ({
      row: {
        original: { qty, unit },
      },
    }) => `${qty}${unit}`,
  }),
  colHelper.accessor("expired_date", {
    header: "Tanggal Berakhir",
    cell: ({ getValue }) => dayjs(getValue()).format("DD MMMM YYYY"),
  }),
  colHelper.display({
    id: "actions",
    cell: Actions,
  }),
];

const ListItem = () => {
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const { data: items, isLoading } = k.inventory.item.all.useQuery({
    variables,
  });
  const table = useReactTable({
    data: items?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <PortalSearch placeholder="Cari Barang..." />
      <DataTable table={table} columns={columns} isloading={isLoading} />
      <div className="mt-4 flex w-full items-center justify-end gap-2">
        <Paginate />
        <PaginationParams meta={items?.meta} />
      </div>
    </>
  );
};

export default ListItem;
