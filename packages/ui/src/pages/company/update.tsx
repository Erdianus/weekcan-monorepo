"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import k, { useQueryClient } from "@repo/api/kit";
import { companyFormSchema as companyForm } from "@repo/api/router/company/schema";
import { Facebook, Instagram, Tiktok, Twitter } from "@ui/components/icon";
import ImageUpload, { ImageUploadType } from "@ui/components/image-upload";
import { SelectAsync } from "@ui/components/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/components/ui/accordion";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const companyFormSchema = companyForm.omit({ owner_id: true }).extend({
  picture_path: z.union([z.string(), z.instanceof(File)]).optional(),
});

const UpdateCompany = ({ id }: { id: string | number }) => {
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
  const { data: company } = k.company.single.useQuery({ variables: { id } });
  const update = k.company.update.useMutation({
    onSuccess: async ({ message }) => {
      router.push("/company");
      await client.invalidateQueries({ queryKey: k.company.all.getKey() });
      toast.success(message);
    },
    onError: ({ message }) => toast.error(message),
  });

  const isload = !company;

  useEffect(() => {
    if (company) {
    const {data} = company;
      form.reset({
        ...company.data,
        instagram: data.instagram ?? undefined,
        tiktok: data.tiktok ?? undefined,
        facebook: data.facebook ?? undefined,
        twitter: data.twitter ?? undefined,
        no_telp: data.no_telp ?? undefined,
        picture_path: undefined,
        owner: {
          label: data.owner.name,
          value: data.owner.id.toString(),
        },
      });
    }
  }, [company]);

  return (
    <>
      <H3 className="mb-4">Update Perusahaan</H3>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((v) => {
            update.mutate({
              id,
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
                  <FormControl isloading={isload}>
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
                  <FormControl isloading={isload}>
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
                  <FormControl isloading={isload}>
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
                  <FormControl isloading={isload}>
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
                  <FormControl isloading={isload}>
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
              render={() => (
                <FormItem className="col-span-2">
                  <FormLabel>Logo Perusahaan</FormLabel>
                  <FormControl isloading={isload}>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username Instagram</FormLabel>
                        <FormControl isloading={isload}>
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
                        <FormControl isloading={isload}>
                          <Input {...field} placeholder="Contoh: user_name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username Facebook</FormLabel>
                        <FormControl isloading={isload}>
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
                        <FormControl isloading={isload}>
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
          <Button>{update.isPending ? <Spinner /> : "Submit"}</Button>
        </form>
      </Form>
    </>
  );
};

export default UpdateCompany;
