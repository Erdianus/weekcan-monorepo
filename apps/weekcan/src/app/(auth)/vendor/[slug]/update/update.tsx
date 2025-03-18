"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, XCircle } from "lucide-react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import { SelectAsync } from "@hktekno/ui/components/select";
import { Button } from "@hktekno/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@hktekno/ui/components/ui/form";
import {
  Input,
  InputCurrency,
  InputPhone,
  isValidPhoneNumber,
} from "@hktekno/ui/components/ui/input";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { loadCityOptions, loadProvinceOptions } from "@hktekno/ui/lib/select";

const formSchema = z
  .object({
    name: z.string().min(1, "Tolong Isi Nama"),
    no_tlp: z
      .string({ required_error: "Tolong Isi No. Telp/HP" })
      .min(1, "Tolong Isi No. Telp/HP"),
    email: z.string(),
    address: z.string().optional(),
    province: z
      .object(
        {
          label: z.string(),
          value: z.string(),
        },
        { invalid_type_error: "Tolong Pilih Provinsi" },
      )
      .nullish(),
    city: z
      .object(
        {
          label: z.string(),
          value: z.string(),
        },
        { invalid_type_error: "Tolong Pilih Kota" },
      )
      .nullish(),
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
    facebook: z.string().optional(),
    item_vendors: z
      .object({
        id: z.union([z.string(), z.number()]),
        name: z.string().min(1, "Tolong Isi Nama Item"),
        qty: z.coerce.number(),
        unit_of_qty: z.string().min(1, "Tolong Isi Unit Kuantitas"),
        price: z.coerce.number(),
        desc: z.string().min(1, "Tolong Isi Deskripsi Item"),
      })
      .array(),
  })
  .refine(({ no_tlp }) => isValidPhoneNumber(no_tlp, "ID"), {
    message: "Bukan Format No. Telp/HP",
    path: ["no_tlp"],
  });

type FormSchema = z.infer<typeof formSchema>;

export const UpdateVendor = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const { data: vendor, isLoading } = k.vendor.single.useQuery({
    variables: { slug },
  });
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      name: vendor?.data.name ?? "",
      no_tlp: vendor?.data.no_tlp ?? "",
      email: vendor?.data.email ?? "",
      address: vendor?.data.address ?? "",
      tiktok: vendor?.data.tiktok ?? "",
      instagram: vendor?.data.instagram ?? "",
      facebook: vendor?.data.facebook ?? "",
      item_vendors: vendor?.data.item_vendors ?? [],
      province: vendor?.data.province
        ? { label: vendor?.data.province, value: vendor?.data.province }
        : null,
      city: vendor?.data.city
        ? { label: vendor?.data.city, value: vendor?.data.city }
        : null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "item_vendors",
  });

  const client = useQueryClient();
  const update = k.vendor.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      router.push("/vendor");
      await client.invalidateQueries({ queryKey: k.vendor.all.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            update.mutate({
              data: {
                ...data,
                province: data.province?.label ?? "",
                city: data.city?.label ?? "",
              },
              slug,
            });
          })}
          className="space-y-5"
        >
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Nama</FormLabel>
                  <FormControl isloading={isLoading}>
                    <Input {...field} placeholder="Isi Nama Vendor" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="no_tlp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>No. Telp/HP</FormLabel>
                  <FormControl isloading={isLoading}>
                    <InputPhone {...field} placeholder="Isi No. Telp/HP" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl isloading={isLoading}>
                    <Input {...field} placeholder="Isi Email" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl isloading={isLoading}>
                    <Input {...field} placeholder="Isi Alamat" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provinsi</FormLabel>
                  <FormControl>
                    <SelectAsync
                      instanceId={"province"}
                      loadOptions={loadProvinceOptions}
                      selectRef={field.ref}
                      value={field.value}
                      additional={{
                        page: 1,
                      }}
                      onChange={(e) => {
                        field.onChange({
                          label: e?.label,
                          value: `${e?.value ?? ""}`,
                        });
                        form.setValue("city", null);
                      }}
                      placeholder="Pilih Provinsi"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kota</FormLabel>
                  <FormControl>
                    <SelectAsync
                      instanceId={"city"}
                      cacheUniqs={[form.watch("province")]}
                      loadOptions={loadCityOptions}
                      placeholder="Pilih Kota"
                      selectRef={field.ref}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange({
                          label: e?.label,
                          value: `${e?.value ?? ""}`,
                        });
                      }}
                      isDisabled={!form.watch("province")}
                      additional={{
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                        province_id: form.watch("province")?.value ?? "",
                        page: 1,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl isloading={isLoading}>
                    <Input
                      {...field}
                      placeholder="Masukkan Username Instagram"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tiktok"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiktok</FormLabel>
                  <FormControl isloading={isLoading}>
                    <Input {...field} placeholder="Masukkan Username Tiktok" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl isloading={isLoading}>
                    <Input
                      {...field}
                      placeholder="Masukkan Username Facebook"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="item_vendors"
              render={() => {
                return (
                  <FormItem className="sticky -top-4 z-10 bg-background py-2">
                    <div className="flex items-center gap-2">
                      <FormLabel>
                        Item Vendor{" "}
                        {fields.length > 0 && <span>({fields.length})</span>}{" "}
                      </FormLabel>

                      <Button
                        type="button"
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() =>
                          append({
                            id: crypto.randomUUID(),
                            name: "",
                            qty: 0,
                            unit_of_qty: "",
                            price: 0,
                            desc: "-",
                          })
                        }
                      >
                        <Plus />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="space-y-4">
              {fields.map((f, i) => {
                return (
                  <Item
                    key={f.id}
                    form={form}
                    i={i}
                    onRemove={() => remove(i)}
                  />
                );
              })}
            </div>
          </div>
          <Button disabled={update.isPending}>
            Submit {update.isPending && <Spinner />}
          </Button>
        </form>
      </Form>
    </>
  );
};

type ItemProps = {
  form: UseFormReturn<FormSchema, any, undefined>;
  i: number;
  onRemove: () => void;
};
const Item = ({ form, i, onRemove }: ItemProps) => {
  return (
    <>
      <div className="relative rounded-lg border px-2 py-3 lg:py-4">
        <p className="absolute left-1 top-1 text-xs text-muted-foreground">
          {i + 1}
        </p>

        <Button
          type="button"
          onClick={onRemove}
          variant={"ghost"}
          size={"icon"}
          className="absolute right-0 top-0"
        >
          <XCircle className="text-destructive" />
        </Button>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name={`item_vendors.${i}.name`}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel required>Nama Item</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Isi Nama Item" />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name={`item_vendors.${i}.desc`}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel required>Deskripsi Item</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Isi Deskripsi Item" />
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </div>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name={`item_vendors.${i}.qty`}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel required>Kuantitas</FormLabel>
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
            name={`item_vendors.${i}.unit_of_qty`}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel required>Unit Kuantitas</FormLabel>
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
          name={`item_vendors.${i}.price`}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>Harga</FormLabel>
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
      </div>
    </>
  );
};
