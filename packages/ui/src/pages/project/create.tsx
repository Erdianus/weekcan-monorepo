"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import k, { useQueryClient } from "@repo/api/kit";
import { projectFormSchema } from "@repo/api/router/project/schema";
import { Select, SelectAsync, SelectAsyncCreatable } from "@ui/components/select";
import { Button } from "@ui/components/ui/button";
import { DateRangePicker } from "@ui/components/ui/date-picker";
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
import { date4Y2M2D } from "@ui/lib/date";
import {
  loadCityOptions,
  loadClientOptions,
  loadCompanyOptions,
  loadProvinceOptions,
  loadUserOptions,
  loadVenueOptions,
  optionsProjectProgress,
  optionsProjectStatus,
  optionsProjectType,
} from "@ui/lib/select";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const projectForm = projectFormSchema
  .omit({
    company_id: true,
    pic: true,
    venue: true,
    venue_id: true,
    client_id: true,
    client: true,
    start_date: true,
    end_date: true,
  })
  .extend({
    date: z.object(
      {
        from: z.date({ required_error: "Tolong Pilih Tanggal" }),
        to: z.date().optional(),
      },
      { required_error: "Tolong Pilih Tanggal" },
    ),
    province: z.object(
      {
        label: z.string(),
        value: z.string(),
      },
      { invalid_type_error: "Tolong Pilih Provinsi" },
    ),
    city: z.object(
      {
        label: z.string(),
        value: z.string(),
      },
      { invalid_type_error: "Tolong Pilih Kota" },
    ),
    type: z.object(
      {
        label: z.string(),
        value: z.string(),
      },
      { invalid_type_error: "Tolong Pilih Tipe Proyek" },
    ),
    progress: z.object(
      {
        label: z.string(),
        value: z.string(),
      },
      { invalid_type_error: "Tolong Pilih Progress Proyek" },
    ),
    status: z.object(
      {
        label: z.string(),
        value: z.string(),
      },
      { invalid_type_error: "Tolong Pilih Status Proyek" },
    ),
  });

const CreateProject = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof projectForm>>({
    resolver: zodResolver(projectForm),
    values: {
      project_name: "",
      desc: "",
      // @ts-ignore
      date: undefined,
      company: [],
      // @ts-ignore
      venue_select: null,
      // @ts-ignore
      client_select: null,
      // @ts-ignore
      province: null,
      // @ts-ignore
      city: null,
      // @ts-ignore
      type: null,
      // @ts-ignore
      progress: null,
      // @ts-ignore
      status: null,
      // @ts-ignore
      picSelect: null,
    },
  });

  const client = useQueryClient();
  const create = k.project.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.project.all.getKey() });
      router.push("/project");
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <H3 className="mb-4">Buat Proyek Baru</H3>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((data) => {
            const venue = data.venue_select.__isNew__
              ? { venue: data.venue_select.value, venue_id: "" }
              : { venue_id: data.venue_select.value, venue: "" };

            const clients = data.client_select.__isNew__
              ? { client: data.client_select.value, client_id: "" }
              : { client_id: data.client_select.value, client: "" };

            create.mutate({
              data: {
                ...data,
                ...venue,
                ...clients,
                type: data.type.value,
                progress: data.progress.value,
                status: data.status.value,
                province: data.province.label,
                city: data.city.label,
                start_date: date4Y2M2D(data.date.from),
                end_date: data.date.to ? date4Y2M2D(data.date.to) : undefined,
                pic: data.picSelect.value,
                company_id: data.company.map((c) => c.value),
              },
            });
          })}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="project_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Proyek</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Contoh: Konser Sheila on 7"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi Singkat</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Contoh: Konser Sheila on Seven perdana di samarinda"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 col-span-2">
                  <FormLabel>Tanggal</FormLabel>
                  <FormControl>
                    <DateRangePicker
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perusahaan</FormLabel>
                  <FormControl>
                    <SelectAsync
                      isMulti
                      loadOptions={loadCompanyOptions}
                      selectRef={field.ref}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        // @ts-ignore
                        form.setValue("picSelect", null);
                      }}
                      placeholder="Pilih Perusahaan"
                      additional={{
                        page: 1,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="picSelect"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Person In Charge</FormLabel>
                  <FormControl>
                    <SelectAsync
                      cacheUniqs={[form.watch("company")]}
                      loadOptions={loadUserOptions}
                      placeholder="Pilih Penanggung Jawab"
                      selectRef={field.ref}
                      value={field.value}
                      onChange={field.onChange}
                      isDisabled={!form.watch("company").length}
                      additional={{
                        page: 1,
                        company_id: form.watch("company").map((c) => c.value),
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provinsi</FormLabel>
                  <FormControl>
                    <SelectAsync
                      loadOptions={loadProvinceOptions}
                      selectRef={field.ref}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        // @ts-ignore
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
                      cacheUniqs={[form.watch("province")]}
                      loadOptions={loadCityOptions}
                      placeholder="Pilih Kota"
                      selectRef={field.ref}
                      value={field.value}
                      onChange={field.onChange}
                      isDisabled={!form.watch("province")}
                      additional={{
                        province_id: form.watch("province")?.value ?? "",
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="venue_select"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempat</FormLabel>
                  <FormControl>
                    <SelectAsyncCreatable
                      loadOptions={loadVenueOptions}
                      placeholder="Pilih Tempat"
                      selectRef={field.ref}
                      value={field.value}
                      onChange={field.onChange}
                      additional={{
                        page: 1,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="client_select"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Klien</FormLabel>
                  <FormControl>
                    <SelectAsyncCreatable
                      loadOptions={loadClientOptions}
                      placeholder="Pilih Klien"
                      selectRef={field.ref}
                      value={field.value}
                      onChange={field.onChange}
                      additional={{
                        page: 1,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipe Proyek</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      options={optionsProjectType()}
                      placeholder="Pilih Tipe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Proyek</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      options={optionsProjectStatus()}
                      placeholder="Pilih Status"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="progress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Progress Proyek</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      options={optionsProjectProgress()}
                      placeholder="Pilih Progress"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={create.isPending}>
            {create.isPending ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateProject;
