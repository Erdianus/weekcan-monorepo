"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Camera, Plus, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import { CropImage, getImgFile } from "@hktekno/ui/components/crop-image";
import { Select, SelectAsync } from "@hktekno/ui/components/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { Button } from "@hktekno/ui/components/ui/button";
import { DatePicker } from "@hktekno/ui/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@hktekno/ui/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@hktekno/ui/components/ui/form";
import { Input } from "@hktekno/ui/components/ui/input";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { Textarea } from "@hktekno/ui/components/ui/textarea";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import { date4Y2M2D } from "@hktekno/ui/lib/date";
import { loadWarehouseOptions } from "@hktekno/ui/lib/select";
import { useImageCropStore } from "@hktekno/ui/lib/store/useImageCropStore";

const itemFormSchema = z.object({
  name: z.string().min(1, "Tolong Isi Nama Barang"),
  unit: z.string().min(1, "Tolong Isi Unit"),
  date: z.date({
    required_error: "Tolong Pilih Tanggal Barang Ditambahkan",
    invalid_type_error: "Tolong Isi Tanggal Barang Masuk",
  }),
  category: z.object({
    label: z.string(),
    value: z.string(),
  }),
  code: z.string().min(1, "Tolong Isi Kode"),
  picture: z.object(
    {
      file: z.instanceof(File, { message: "Tolong Pilih Gambar" }),
      src: z.string().min(1, "Tolong Pilih Gambar"),
    },
    { message: "Tolong Pilih Gambar" },
  ),
  warehouse_stock: z
    .object({
      id: z.number(),
      warehouse: z.object(
        {
          label: z.string(),
          value: z.string(),
        },
        { invalid_type_error: "Tolong Pilih Gudang" },
      ),
      qty: z.coerce.number().min(1, "Tolong Isi Jumlah"),
      ket: z.string(),
      date: z
        .date({
          required_error: "Tolong Pilih Tanggal Barang Kadaluarsa",
          invalid_type_error: "Tolong Isi Tanggal Barang Expired",
        })
        .optional(),
    })
    .array()
    .min(1, "Tolong Isi Stock Gudang Min. 1"),
});

const categories = ["Barang", "Server"].map((v) => ({ label: v, value: v }));
const date = new Date();

const CreateItem = () => {
  const imgCrop = useImageCropStore();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [id, setID] = useState(1);

  const router = useRouter();
  const form = useForm<z.infer<typeof itemFormSchema>>({
    resolver: zodResolver(itemFormSchema),
    values: {
      name: "",
      unit: "",
      date,
      category: {
        label: "Barang",
        value: "Barang",
      },
      picture: {
        // @ts-expect-error sengaja biar error
        file: undefined,
        src: "",
      },
      warehouse_stock: [],
    },
  });

  const client = useQueryClient();
  const create = k.inventory.item.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      router.push("/inventory/item");
      await client.invalidateQueries({
        queryKey: k.inventory.item.all.getKey(),
      });
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
      <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ganti Foto</DialogTitle>
          </DialogHeader>
          <CropImage />
          <Button
            type="button"
            onClick={async () => {
              const imgFile = await getImgFile(imgCrop);

              form.setValue("picture", {
                file: imgFile,
                src: URL.createObjectURL(imgFile),
              });
              setOpen(false);
            }}
          >
            Upload
          </Button>
        </DialogContent>
      </Dialog>
      {JSON.stringify(form.formState.errors)}
      <H3 className="mb-4">Tambahkan Barang Baru</H3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((v) => {
            create.mutate({
              data: {
                name: v.name,
                unit: v.unit,
                category: v.category.value,
                code: v.code,
                date: date4Y2M2D(v.date),
                picture_path: v.picture.file,
                warehouse_stock: v.warehouse_stock.map((vv) => ({
                  warehouse_id: vv.warehouse.value,
                  qty: vv.qty,
                  ket: vv.ket,
                  expired_date: date4Y2M2D(vv.date),
                })),
              },
            });
          })}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Barang</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Contoh: Kursi" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="">Tanggal Masuk</FormLabel>
                  <FormControl>
                    <DatePicker
                      className="flex w-full"
                      value={field.value}
                      defaultMonth={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Barang</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Contoh: Pcs" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      options={categories}
                      placeholder="Pilih Kategori"
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
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode Barang</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Isi Kode Barang" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="picture.src"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gambar</FormLabel>
                  <Avatar className="group relative mb-4 h-20 w-20">
                    <AvatarImage src={field.value} />
                    <AvatarFallback>😆</AvatarFallback>
                    <label
                      htmlFor="img"
                      className="absolute flex h-20 w-20 flex-col items-center justify-center bg-gray-900/60 text-xs text-white opacity-0 transition group-hover:opacity-90"
                    >
                      <Camera size={16} />
                      <div>Ganti Foto</div>
                    </label>
                    <input
                      ref={fileRef}
                      id="img"
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setOpen(true);
                          imgCrop.setCrop(undefined); // Makes crop preview update between images.
                          const reader = new FileReader();
                          reader.addEventListener("load", () =>
                            imgCrop.setImgSrc(reader.result?.toString() ?? ""),
                          );
                          // @ts-expect-error gapapa error gan
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </Avatar>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p>Stock Gudang</p>
              <Button
                type="button"
                className="h-8 w-8"
                variant={"outline"}
                size={"icon"}
                onClick={() => {
                  form.setValue("warehouse_stock", [
                    // @ts-expect-error gapapa error gan
                    ...form.watch("warehouse_stock"),
                    {
                      id,
                      date,
                      ket: "-",
                      qty: 1,
                      // @ts-expect-error gapapa error gan
                      warehouse: null,
                    },
                  ]);
                  setID((o) => o + 1);
                }}
              >
                <Plus size={16} />
              </Button>
            </div>
            <p className="text-sm text-destructive">
              {form.formState.errors.warehouse_stock?.message}
            </p>
          </div>
          <div>
            {form.watch("warehouse_stock").map(({ id }, i) => (
              <div
                key={`stock-${id}`}
                className="relative mb-4 grid grid-cols-1 gap-3 rounded-lg border px-2 pb-4 pt-2 md:grid-cols-2"
              >
                <Button
                  className="absolute -left-4 -top-4 h-8 w-8 rounded-full hover:bg-destructive hover:text-destructive-foreground"
                  variant={"ghost"}
                  size={"icon"}
                  type="button"
                  onClick={() => {
                    form.setValue(
                      "warehouse_stock",
                      form.watch("warehouse_stock").filter((v) => v.id !== id),
                    );
                  }}
                >
                  <XCircle size={16} />
                </Button>
                <FormField
                  control={form.control}
                  name={`warehouse_stock.${i}.warehouse`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Gudang</FormLabel>
                      <FormControl>
                        <SelectAsync
                          value={field.value}
                          onChange={field.onChange}
                          loadOptions={loadWarehouseOptions}
                          placeholder="Pilih Gudang"
                          additional={{ page: 1 }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`warehouse_stock.${i}.qty`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Masukkan Jumlah Stock"
                          type="number"
                          min="1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`warehouse_stock.${i}.date`}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="">Tanggal Kadaluarsa</FormLabel>
                      <FormControl>
                        <DatePicker
                          className="flex w-full"
                          value={field.value}
                          defaultMonth={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`warehouse_stock.${i}.ket`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Keterangan</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Masukkan Keterangan"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <Button>{create.isPending ? <Spinner /> : "Submit"}</Button>
        </form>
      </Form>
    </>
  );
};

export default CreateItem;
