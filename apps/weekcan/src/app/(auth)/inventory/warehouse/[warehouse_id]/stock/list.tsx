"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { atom, useAtom } from "jotai";
import {
  ArrowDownWideNarrow,
  CalendarOff,
  Check,
  MoreHorizontal,
  Package,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { inferData, k } from "@hktekno/api";
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
import { DatePicker } from "@hktekno/ui/components/ui/date-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
import { Input } from "@hktekno/ui/components/ui/input";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { Textarea } from "@hktekno/ui/components/ui/textarea";
import { date4Y2M2D } from "@hktekno/ui/lib/date";
import useAlertStore from "@hktekno/ui/lib/store/useAlertStore";
import { useImageCropStore } from "@hktekno/ui/lib/store/useImageCropStore";
import { shortName } from "@hktekno/ui/lib/utils";

type Form = {
  warehouse_id: string;
  item_id: string;
  expired_date: Date;
  qty: number | string;
  ket: string;
};

const editIDAtom = atom(0);

const EditStock = ({
  data,
}: {
  data: inferData<typeof k.inventory.warehouse.stock.single>["data"];
}) => {
  const [editID, setEditID] = useAtom(editIDAtom);
  const imgCrop = useImageCropStore();
  const [field, setField] = useState<Form>({
    ...data,
    expired_date: dayjs(data.expired_date).toDate(),
  });

  const client = useQueryClient();
  const update = k.inventory.warehouse.stock.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.inventory.warehouse.stock.all.getKey(),
      });
      setEditID(0);
    },
    onError: ({ message }) => toast.error(message),
  });

  useEffect(() => {
    return () => {
      imgCrop.reset();
    };
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          update.mutate({
            id: `${editID}`,
            data: {
              warehouse_id: data.warehouse_id,
              item_id: data.item_id,
              expired_date: date4Y2M2D(field.expired_date),
              qty: Number(field.qty),
              ket: field.ket,
            },
          });
        }}
        className="mb-4 rounded-lg border p-2"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-lg">
            <Avatar className="group relative h-14 w-14 rounded">
              <AvatarImage src={data.picture_path} />
              <AvatarFallback>{shortName(data.name)}</AvatarFallback>
            </Avatar>
            <div>{data.name}</div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              disabled={update.isPending}
              type="button"
              variant={"outline"}
              size={"icon"}
              onClick={() => setEditID(0)}
            >
              <X size={16} />
            </Button>
            <Button
              disabled={update.isPending}
              type="submit"
              variant={"outline"}
              size={"icon"}
            >
              {update.isPending ? <Spinner /> : <Check size={16} />}
            </Button>
          </div>
        </div>
        <ItemDetail
          icon={CalendarOff}
          label="Tanggal Kadaluarsa"
          value={
            <DatePicker
              value={field.expired_date}
              defaultMonth={field.expired_date}
              onChange={(_, d) => setField((o) => ({ ...o, expired_date: d }))}
            />
          }
        />
        <ItemDetail
          icon={Package}
          label="Stock"
          value={
            <Input
              value={field.qty}
              onChange={(e) => setField((o) => ({ ...o, qty: e.target.value }))}
              placeholder="Isi Stock"
              type="number"
            />
          }
        />
        <ItemDetail
          icon={ArrowDownWideNarrow}
          label="Keterangan"
          value={
            <Textarea
              value={field.ket}
              onChange={(e) => setField((o) => ({ ...o, ket: e.target.value }))}
            />
          }
        />
      </form>
    </>
  );
};

const ListStock = ({ warehouse_id }: { warehouse_id: string }) => {
  const [editID, setEditID] = useAtom(editIDAtom);
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
          <Loading keyname="loadingstock">
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
        {stocks?.data.map((stock) => {
          if (editID === stock.id) return <EditStock data={stock} />;
          return (
            <div
              key={`stock-${stock.id}`}
              className="mb-4 rounded-lg border p-2"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-1 text-lg">
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
                    <DropdownMenuItem onClick={() => setEditID(stock.id)}>
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
          );
        })}
      </Flashlist>
    </>
  );
};

export default ListStock;
