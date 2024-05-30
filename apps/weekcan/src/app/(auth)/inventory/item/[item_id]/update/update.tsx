"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Camera, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import { CropImage, getImgFile } from "@hktekno/ui/components/crop-image";
import { Select } from "@hktekno/ui/components/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { Button } from "@hktekno/ui/components/ui/button";
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
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import { useImageCropStore } from "@hktekno/ui/lib/store/useImageCropStore";

const itemFormSchema = z.object({
  name: z.string().min(1, "Tolong Isi Nama Barang"),
  unit: z.object({
    label: z.string(),
    value: z.string(),
  }),
  picture: z.object(
    {
      file: z.instanceof(File, { message: "Tolong Pilih Gambar" }).optional(),
      src: z.string().min(1, "Tolong Pilih Gambar"),
    },
    { message: "Tolong Pilih Gambar" },
  ),
});

const units = ["pcs", "box"].map((v) => ({ label: v, value: v }));

const UpdateItem = ({ id }: { id: string }) => {
  const router = useRouter();
  const imgCrop = useImageCropStore();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);

  const client = useQueryClient();
  const { data: item, isLoading } = k.inventory.item.single.useQuery({
    variables: { id },
  });

  const update = k.inventory.item.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      router.push("/inventory/item");
      await client.invalidateQueries({
        queryKey: k.inventory.item.all.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  const form = useForm<z.infer<typeof itemFormSchema>>({
    resolver: zodResolver(itemFormSchema),
    values: {
      name: "",
      // @ts-expect-error sengaja biar error
      unit: null,
      picture: {
        file: undefined,
        src: "",
      },
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        name: item.data.name,
        unit: {
          label: item.data.unit,
          value: item.data.unit,
        },
        picture: {
          file: undefined,
          src: item.data.picture_link,
        },
      });
    }
  }, [item]);

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
      <H3 className="mb-4">Buat Proyek Baru</H3>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((v) => {
            update.mutate({
              id,
              data: {
                name: v.name,
                unit: v.unit.value,
                picture_path: v.picture.file,
              },
            });
          })}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Barang</FormLabel>
                  <FormControl isloading={!!isLoading}>
                    <Input {...field} placeholder="Contoh: Kursi" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl isloading={!!isLoading}>
                    <Select
                      {...field}
                      options={units}
                      placeholder="Pilih Unit"
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
              name="picture.src"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gambar</FormLabel>
                  <div className="flex items-center gap-2">
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
                              imgCrop.setImgSrc(
                                reader.result?.toString() ?? "",
                              ),
                            );
                            // @ts-expect-error gapapa error gan
                            reader.readAsDataURL(e.target.files[0]);
                          }
                        }}
                      />
                    </Avatar>
                    {!!form.watch("picture.file") && (
                      <Button
                        type="button"
                        variant={"ghost"}
                        size={"icon"}
                        className="h-8 w-8 rounded-full hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => {
                          form.setValue("picture", {
                            file: undefined,
                            src: item?.data.picture_link ?? "",
                          });
                        }}
                      >
                        <XCircle size={16} />
                      </Button>
                    )}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={update.isPending}>
            {update.isPending ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UpdateItem;
