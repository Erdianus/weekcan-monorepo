"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, XCircle } from "lucide-react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
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

const formSchema = z
  .object({
    name: z.string().min(1, "Tolong Isi Nama"),
    no_tlp: z
      .string({ required_error: "Tolong Isi No. Telp/HP" })
      .min(1, "Tolong Isi No. Telp/HP"),
    email: z
      .string({ required_error: "Tolong Isi Email" })
      .min(1, "Tolong Isi Email")
      .email("Bukan Format Email"),
    address: z.string().min(1, "Tolong Isi Alamat"),
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
    facebook: z.string().optional(),
    item_vendors: z
      .object({
        id: z.string(),
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

export const CreateVendor = () => {
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      name: "",
      no_tlp: "",
      email: "",
      address: "",
      tiktok: "",
      instagram: "",
      facebook: "",
      item_vendors: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "item_vendors",
  });

  const client = useQueryClient();
  const create = k.vendor.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      router.back();
      await client.invalidateQueries({ queryKey: k.vendor.all.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            create.mutate({ data });
          })}
          className="space-y-5"
        >
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
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
                  <FormLabel>No. Telp/HP</FormLabel>
                  <FormControl>
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
                  <FormControl>
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
                  <FormControl>
                    <Input {...field} placeholder="Isi Alamat" />
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
                  <FormControl>
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
                  <FormControl>
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
                  <FormControl>
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
                            unit_of_qty: "paket",
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
          <Button disabled={create.isPending}>
            Submit {create.isPending && <Spinner />}
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
          <XCircle className="text-red-500" />
        </Button>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name={`item_vendors.${i}.name`}
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
            name={`item_vendors.${i}.desc`}
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
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name={`item_vendors.${i}.qty`}
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
            name={`item_vendors.${i}.unit_of_qty`}
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
          name={`item_vendors.${i}.price`}
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
      </div>
    </>
  );
};
