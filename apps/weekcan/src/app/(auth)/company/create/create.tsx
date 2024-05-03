"use client";

import type z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { ImageUploadType } from "@hktekno/ui/components/image-upload";
import { k } from "@hktekno/api";
import { companyFormSchema as companyForm } from "@hktekno/api/routers/company/schema";
import ImageUpload from "@hktekno/ui/components/image-upload";
import { SelectAsync } from "@hktekno/ui/components/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@hktekno/ui/components/ui/accordion";
import { Button } from "@hktekno/ui/components/ui/button";
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
import { Facebook, Instagram, Tiktok, Twitter } from "@hktekno/ui/icon";
import { loadUserOptions } from "@hktekno/ui/lib/select";

const companyFormSchema = companyForm.omit({ owner_id: true });

const CreateCompany = () => {
  const router = useRouter();
  const [images, setImages] = useState<ImageUploadType>([]);

  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    values: {
      company_name: "",
      email: "",
      picture_path: "",
      // @ts-expect-error gapapa error gan
      owner: null,
      address: "",
      no_telp: "",
      twitter: undefined,
      facebook: undefined,
      instagram: undefined,
      tiktok: undefined,
    },
  });

  const client = useQueryClient();
  const create = k.company.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      router.push("/company");
      await client.invalidateQueries({ queryKey: k.company.all.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <H3 className="mb-4">Buat Perusahaan Baru</H3>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((v) => {
            create.mutate({
              data: {
                ...v,
                owner_id: v.owner.value,
              },
            });
          })}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Perusahaan</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Nama Perusahaan" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Masukkan Alamat Perusahaan"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Email Perusahaan" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="no_telp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Telp</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Masukkan No. Telp Perusahaan"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Pemilik Perusahaan</FormLabel>
                  <FormControl>
                    <SelectAsync
                      {...field}
                      loadOptions={loadUserOptions}
                      selectRef={field.ref}
                      additional={{
                        page: 1,
                        isOwner: true,
                      }}
                      placeholder="Pilih Pemilik Perusahaan"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="picture_path"
              render={() => (
                <FormItem className="col-span-2">
                  <FormLabel>Logo Perusahaan</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={images}
                      onChange={(v) => {
                        setImages(v);
                        form.setValue("picture_path", v[0]?.file ?? "");
                        if (v.length) form.clearErrors("picture_path");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex flex-wrap gap-4">
                  <div className="">Sosial Media</div>
                  <div className="flex items-center gap-4 text-foreground">
                    {!!form.watch("instagram") && <Instagram />}
                    {!!form.watch("tiktok") && <Tiktok />}
                    {!!form.watch("facebook") && <Facebook />}
                    {!!form.watch("twitter") && <Twitter />}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 p-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username Instagram</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Contoh: oystr_29" />
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
                        <FormLabel>Username Tiktok</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Contoh: user_name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username Facebook</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Contoh: user_name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username Tiktok</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Contoh: user_name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button>{create.isPending ? <Spinner /> : "Submit"}</Button>
        </form>
      </Form>
    </>
  );
};

export default CreateCompany;
