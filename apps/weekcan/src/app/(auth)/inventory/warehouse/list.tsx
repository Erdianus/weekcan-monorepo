"use client";

import type { CellContext } from "@tanstack/react-table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Plus, Trash2, Zap } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { SelectAsync } from "@hktekno/ui/components/select";
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
import { Input } from "@hktekno/ui/components/ui/input";
import { Label } from "@hktekno/ui/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@hktekno/ui/components/ui/popover";
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

type Warehouse = inferData<typeof k.inventory.warehouse.all>["data"][number];
const colHelper = createColumnHelper<Warehouse>();

const Actions = ({ row }: CellContext<Warehouse, unknown>) => {
  const alert = useAlertStore();

  const { original: data } = row;

  const client = useQueryClient();
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            {del.isPending ? (
              <Spinner />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              alert.setData({
                open: true,
                confirmText: "Ya, Hapus",
                header: `Yakin ingin mengapus '${data.name}'?`,
                desc: "Gudang yang dihapus tidak dapat dikembalikan lagi",
                onConfirm: () => {
                  del.mutate({ id: `${data.id}` });
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
  colHelper.accessor("company", {
    header: "Perusahaan",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={getValue().picture_path} />
          <AvatarFallback>{shortName(getValue().company_name)}</AvatarFallback>
        </Avatar>
        <div>{getValue().company_name}</div>
      </div>
    ),
  }),
  colHelper.display({
    id: "actions",
    cell: Actions,
  }),
];

const ListWarehouse = () => {
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

  const table = useReactTable({
    data: warehouses?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
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
      <DataTable table={table} columns={columns} isloading={!warehouses} />
    </>
  );
};

export default ListWarehouse;
