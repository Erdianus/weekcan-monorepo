"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import k, { useQueryClient } from "@repo/api/kit";
import { companyFormSchema as companyForm } from "@repo/api/router/company/schema";
import ImageUpload, { ImageUploadType } from "@ui/components/image-upload";
import { SelectAsync } from "@ui/components/select";
import { Button } from "@ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import Spinner from "@ui/components/ui/spinner";
import { H3 } from "@ui/components/ui/typograhpy";
import { loadUserOptions } from "@ui/lib/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

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
      // @ts-ignore
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
      await client.invalidateQueries({ queryKey: k.company.all.getKey() });
      router.push("/company");
      toast.success(message);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="picture_path"
              render={({ field, formState }) => (
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
          <Button>{create.isPending ? <Spinner /> : "Submit"}</Button>
        </form>
      </Form>
    </>
  );
};

export default CreateCompany;
