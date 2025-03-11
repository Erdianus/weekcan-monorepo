"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  Mail,
  MapPin,
  MoreHorizontal,
  Pencil,
  Phone,
  Plus,
  Trash2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { Button } from "@hktekno/ui/components/ui/button";
import { DrawerDialog } from "@hktekno/ui/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@hktekno/ui/components/ui/form";
import { Input, InputCurrency } from "@hktekno/ui/components/ui/input";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import { Facebook, Instagram, Tiktok } from "@hktekno/ui/icon";
import useAlertStore from "@hktekno/ui/lib/store/useAlertStore";

const formSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string().min(1, "Tolong Isi Nama Item"),
  qty: z.coerce.number(),
  unit_of_qty: z.string().min(1, "Tolong Isi Unit Kuantitas"),
  price: z.coerce.number(),
  desc: z.string().min(1, "Tolong Isi Deskripsi Item"),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValue: FormSchema = {
  id: "",
  name: "",
  qty: 0,
  unit_of_qty: "",
  price: 0,
  desc: "-",
};

export function DetailVendor({ slug }: { slug: string }) {
  const [type, setType] = useState<"create" | "update">();
  const alert = useAlertStore();
  const { data, isLoading } = k.vendor.single.useQuery({ variables: { slug } });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: defaultValue,
  });

  const client = useQueryClient();

  const create = k.vendor.item.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.vendor.single.getKey({ slug }),
      });
      await client.invalidateQueries({
        queryKey: k.vendor.all.getKey(),
      });

      form.reset(defaultValue);
      setType(undefined);
    },
    onError: ({ message }) => toast.error(message),
  });

  const update = k.vendor.item.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.vendor.single.getKey({ slug }),
      });
      await client.invalidateQueries({
        queryKey: k.vendor.all.getKey(),
      });
      form.reset(defaultValue);
      setType(undefined);
    },
    onError: ({ message }) => toast.error(message),
  });

  const isPending = create.isPending || update.isPending;

  const del = k.vendor.item.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.vendor.single.getKey({ slug }),
      });
      await client.invalidateQueries({
        queryKey: k.vendor.all.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <DrawerDialog
        open={!!type}
        title={
          type === "create"
            ? "Item Baru"
            : type === "update"
              ? "Update Item"
              : "-"
        }
        description={
          type === "create" ? "Buat Item Vendor Baru" : "Update Item Vendor"
        }
        onOpenChange={(open) => {
          if (!open) {
            form.reset(defaultValue);
            setType(undefined);
          }
        }}
      >
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit((v) => {
              const d: Omit<FormSchema, "id"> = {
                name: v.name,
                qty: v.qty,
                unit_of_qty: v.unit_of_qty,
                desc: v.desc ?? "-",
                price: v.price,
              };

              if (v.id) {
                update.mutate({
                  id: v.id,
                  data: d,
                });
                return;
              }

              create.mutate({
                data: { ...d, vendor_id: data?.data.id ?? 0 },
              });
            })}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name={`name`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Nama Item</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Isi Nama Item" />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name={`desc`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Deskripsi Item</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Isi Deskripsi Item" />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name={`qty`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Kuantitas</FormLabel>
                      <FormControl>
                        <InputCurrency
                          ref={field.ref}
                          value={field.value}
                          prefix=""
                          onValueChange={(v) => {
                            field.onChange(v);
                          }}
                          defaultValue={"0"}
                          placeholder="Isi Kuantitas"
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name={`unit_of_qty`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Unit Kuantitas</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Contoh: Paket, Lusin" />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
            <FormField
              control={form.control}
              name={`price`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Harga</FormLabel>
                    <FormControl>
                      <InputCurrency
                        ref={field.ref}
                        value={field.value}
                        onValueChange={(v) => {
                          field.onChange(v);
                        }}
                        defaultValue={"0"}
                        placeholder="Isi Harga"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button disabled={isPending}>
              Submit {isPending && <Spinner />}
            </Button>
          </form>
        </Form>
      </DrawerDialog>
      {isLoading ? (
        <Skeleton className="mb-4 h-8 w-40" />
      ) : (
        <H3 className="border-b-none mb-4 w-max">{data?.data.name}</H3>
      )}
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <Phone />
          {isLoading ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            <div>
              <div className="text-xs text-muted-foreground">No. Telp/HP</div>
              <div className="">{data?.data.no_tlp}</div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Mail />
          {isLoading ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            <div>
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="">{data?.data.email}</div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <MapPin />
          {isLoading ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            <div>
              <div className="text-xs text-muted-foreground">Alamat</div>
              <div className="">{data?.data.address}</div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Tiktok />
          {isLoading ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            <div>
              <div className="text-xs text-muted-foreground">Tiktok</div>
              <div className="">{data?.data.tiktok ?? "-"}</div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Instagram />
          {isLoading ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            <div>
              <div className="text-xs text-muted-foreground">Instagram</div>
              <div className="">{data?.data.instagram ?? "-"}</div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Facebook />
          {isLoading ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            <div>
              <div className="text-xs text-muted-foreground">Facebook</div>
              <div className="">{data?.data.facebook ?? "-"}</div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <h3 className="text-xl font-medium">List Item</h3>
            {data?.data.item_vendors && data.data.item_vendors.length > 0 && (
              <Badge variant={"secondary"}>
                {data?.data.item_vendors.length}
              </Badge>
            )}
          </div>
          <Button
            size={"icon"}
            variant={"ghost"}
            type={"button"}
            onClick={() => setType("create")}
          >
            <Plus />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <Spinner />
          ) : (
            data?.data.item_vendors.map((iv) => {
              return (
                <div
                  key={`itemmm-${iv.id}`}
                  className="space-y-2 rounded border p-4"
                >
                  <div>
                    <p className="font-medium lg:text-lg">{iv.name}</p>
                    <p className="text-sm text-muted-foreground lg:text-base">
                      {iv.desc}
                    </p>
                  </div>
                  <p>
                    {iv.qty} {iv.unit_of_qty}
                  </p>
                  <div className="flex items-center justify-between">
                    <p>
                      {new Intl.NumberFormat("id-ID", {
                        currency: "IDR",
                        style: "currency",
                        maximumFractionDigits: 0,
                      }).format(iv.price)}
                    </p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          {false ? (
                            <Spinner />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setType("update");
                            form.reset(iv);
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            alert.setData({
                              open: true,
                              confirmText: "Ya, Hapus",
                              onConfirm: () => {
                                del.mutate({ id: iv.id });
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
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
