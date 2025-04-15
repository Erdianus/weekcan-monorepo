"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Pencil, Plus, Trash2, X, Zap } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import Loading from "@hktekno/ui/components/loading";
import Paginate from "@hktekno/ui/components/paginate";
import PaginationParams from "@hktekno/ui/components/pagination-params";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { SelectAsync } from "@hktekno/ui/components/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { Button } from "@hktekno/ui/components/ui/button";
import { Input } from "@hktekno/ui/components/ui/input";
import { Label } from "@hktekno/ui/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@hktekno/ui/components/ui/popover";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import { loadCompanyOptions } from "@hktekno/ui/lib/select";
import useAlertStore from "@hktekno/ui/lib/store/useAlertStore";
import { shortName } from "@hktekno/ui/lib/utils";

const warehouseForm = z.object({
  name: z.string().min(1, "Tolong Isi Nama Gudang"),
  company: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { invalid_type_error: "Tolong Pilih Perusahaan" },
  ),
});

const EditWarehouse = (props: {
  data: z.infer<typeof warehouseForm> & { id: string | number };
  onClose: () => void;
}) => {
  const [data, setData] = useState<z.infer<typeof warehouseForm>>(props.data);

  const client = useQueryClient();
  const update = k.inventory.warehouse.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      props.onClose();
      await client.invalidateQueries({
        queryKey: k.inventory.warehouse.all.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });
  return (
    <form
      className="flex w-full items-center justify-between"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        update.mutate({
          id: `${props.data.id}`,
          data: {
            name: data.name,
            company_id: data.company.value,
          },
        });
      }}
    >
      <div className="space-y-2">
        <Label>Nama Gudang</Label>
        <Input
          value={data.name}
          onChange={(e) => setData((o) => ({ ...o, name: e.target.value }))}
        />
        <Label>Perusahaan</Label>
        <SelectAsync
          loadOptions={loadCompanyOptions}
          value={data.company}
          onChange={(company) => {
            // @ts-expect-error gapapa error gan
            setData((o) => ({ ...o, company }));
          }}
        />
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant={"ghost"}
          size={"icon"}
          type="button"
          onClick={props.onClose}
        >
          <X size={20} />
        </Button>
        <Button variant={"ghost"} size={"icon"} type="submit">
          {update.isPending && update.variables.id === `${props.data.id}` ? (
            <Spinner />
          ) : (
            <Check />
          )}
        </Button>
      </div>
    </form>
  );
};

const ListWarehouse = () => {
  const [editID, setEditID] = useState(0);
  const alert = useAlertStore();

  const form = useForm<z.infer<typeof warehouseForm>>({
    resolver: zodResolver(warehouseForm),
    values: {
      name: "",
      // @ts-expect-error gapapa gan error
      company: null,
    },
  });

  const client = useQueryClient();
  const { data: warehouses } = k.inventory.warehouse.all.useQuery();
  const create = k.inventory.warehouse.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      form.reset();
      await client.invalidateQueries({
        queryKey: k.inventory.warehouse.all.getKey(),
      });
    },
  });

  const del = k.inventory.warehouse.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.inventory.warehouse.all.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <PortalSearch placeholder="Cari Gudang..." />
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">Gudang</H3>
        <Popover>
          <PopoverTrigger asChild className="relative">
            <Button className="relative" size={"icon"}>
              <Plus />
              <Zap className="absolute bottom-1 right-1" size={12} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Tambah Gudang</h4>
              </div>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit((data) => {
                  create.mutate({
                    data: { ...data, company_id: data.company.value },
                  });
                })}
              >
                <div>
                  <Label>Nama</Label>
                  <Input
                    {...form.register("name")}
                    placeholder="Contoh: Gudang A"
                  />
                </div>
                <Controller
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <div>
                      <Label>Perusahaan</Label>
                      <SelectAsync
                        menuPortalTarget={
                          typeof window !== "undefined" ? document.body : null
                        }
                        value={field.value}
                        onChange={field.onChange}
                        selectRef={field.ref}
                        loadOptions={loadCompanyOptions}
                      />
                    </div>
                  )}
                />

                <Button type="submit" disabled={create.isPending}>
                  {create.isPending ? <Spinner /> : "Submit"}
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Flashlist
        isloading={!warehouses}
        loading={
          <Loading>
            <div className="flex items-center justify-between gap-4 border-b border-border p-4">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </Loading>
        }
        isfallback={warehouses?.data.length === 0}
        fallback={<div>Tidak Ada Gudang</div>}
      >
        {warehouses?.data.map((warehouse) => (
          <div
            key={`warehouse-${warehouse.id}`}
            className="flex items-center justify-between gap-4 border-b border-border p-4"
          >
            {editID === warehouse.id && (
              <EditWarehouse
                data={{
                  name: warehouse.name,
                  id: warehouse.id,
                  company: {
                    label: warehouse.company.company_name,
                    value: `${warehouse.company.id}`,
                  },
                }}
                onClose={() => setEditID(0)}
              />
            )}
            {editID !== warehouse.id && (
              <>
                <div>
                  <Link
                    className="hover:underline"
                    href={`/inventory/warehouse/${warehouse.id}`}
                  >
                    {warehouse.name}
                  </Link>
                  <div className="flex items-center gap-1">
                    <Avatar className="h-6 w-6 text-xs">
                      <AvatarImage src={warehouse.company.picture_link} />
                      <AvatarFallback>
                        {shortName(warehouse.company.company_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-xs text-muted-foreground">
                      {warehouse.company.company_name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    type="button"
                    onClick={() => setEditID(warehouse.id)}
                  >
                    <Pencil size={20} />
                  </Button>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    type="button"
                    onClick={() => {
                      alert.setData({
                        open: true,
                        header: `Yakin ingin menghapus '${warehouse.name}'?`,
                        desc: "Gudang yang sudah dihapus tidak dapat dikembalikan lagi.",
                        confirmText: "Ya, Hapus",
                        onConfirm: () => {
                          del.mutate({ id: `${warehouse.id}` });
                        },
                      });
                    }}
                  >
                    {del.isPending && del.variables.id === `${warehouse.id}` ? (
                      <Spinner />
                    ) : (
                      <Trash2 size={20} />
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </Flashlist>
      <div className="mt-4 flex w-full items-center justify-end gap-4">
        <Paginate />
        <PaginationParams meta={warehouses?.meta} />
      </div>
    </>
  );
};

export default ListWarehouse;
