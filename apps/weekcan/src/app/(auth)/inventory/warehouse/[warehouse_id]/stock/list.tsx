"use client";

import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  ArrowDownWideNarrow,
  CalendarOff,
  MoreHorizontal,
  Package,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import { ItemDetail } from "@hktekno/ui/components/item-detail";
import Loading from "@hktekno/ui/components/loading";
import PortalSearch from "@hktekno/ui/components/portal-search";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { Button } from "@hktekno/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import Spinner from "@hktekno/ui/components/ui/spinner";
import useAlertStore from "@hktekno/ui/lib/store/useAlertStore";
import { shortName } from "@hktekno/ui/lib/utils";

const ListStock = ({ warehouse_id }: { warehouse_id: string }) => {
  const alert = useAlertStore();

  const searchParams = useSearchParams();
  const search = searchParams.get("search")
    ? { search: searchParams.get("search") ?? "" }
    : {};

  const client = useQueryClient();
  const { data: stocks, isLoading } = k.inventory.warehouse.stock.all.useQuery({
    variables: { ...search, warehouse_id },
  });

  const del = k.inventory.warehouse.stock.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.inventory.warehouse.stock.all.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <PortalSearch placeholder="Cari Stock Barang..." />
      <Flashlist
        isloading={isLoading}
        loading={
          <Loading>
            <div className="mb-2 rounded-lg border p-2">
              <div className="mb-2 flex items-center gap-1">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-4 w-12 " />
              </div>
              <ItemDetail
                icon={CalendarOff}
                label="Tanggal Kadaluarsa"
                value={undefined}
              />
              <ItemDetail icon={Package} label="Stock" value={undefined} />
              <ItemDetail
                icon={ArrowDownWideNarrow}
                label="Keterangan"
                value={undefined}
              />
            </div>
          </Loading>
        }
      >
        {stocks?.data.map((stock) => (
          <div className="mb-4 rounded-lg border p-2">
            <div className="flex items-start justify-between">
              <div className="mb-2 flex items-center gap-1 text-lg">
                <Avatar className="h-14 w-14 rounded">
                  <AvatarImage src={stock.picture_path} />
                  <AvatarFallback>{shortName(stock.name)}</AvatarFallback>
                </Avatar>
                <div>{stock.name}</div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger disabled={del.isPending} asChild>
                  <Button
                    disabled={del.isPending}
                    variant="ghost"
                    className="h-8 w-8 p-0"
                  >
                    <span className="sr-only">Open menu</span>
                    {del.isPending ? (
                      <Spinner />
                    ) : (
                      <MoreHorizontal className="h-4 w-4" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-red-500 dark:hover:bg-red-900 dark:hover:text-red-50"
                    onClick={() => {
                      alert.setData({
                        open: true,
                        confirmText: "Ya, Hapus",
                        header: `Yakin ingin mengapus '${stock.name}'?`,
                        desc: "Stock Barang yang dihapus tidak dapat dikembalikan lagi",
                        onConfirm: () => {
                          del.mutate({
                            data: {
                              warehouse_id: stock.warehouse_id,
                              item_id: stock.item_id,
                            },
                          });
                        },
                      });
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Hapus</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <ItemDetail
              icon={CalendarOff}
              label="Tanggal Kadaluarsa"
              value={dayjs(stock.expired_date).format("DD MMMM YYYY")}
            />
            <ItemDetail
              icon={Package}
              label="Stock"
              value={`${stock.qty}${stock.unit}`}
            />
            <ItemDetail
              icon={ArrowDownWideNarrow}
              label="Keterangan"
              value={stock.ket}
            />
          </div>
        ))}
      </Flashlist>
    </>
  );
};

export default ListStock;
