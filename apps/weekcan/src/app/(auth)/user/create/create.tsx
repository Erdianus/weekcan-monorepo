"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

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
import { Input } from "@hktekno/ui/components/ui/input";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import {
  loadCompanyOptions,
  loadJobTypeOptions,
  loadRoleOptions,
} from "@hktekno/ui/lib/select";

const formSchema = z
  .object({
    name: z.string().min(1, "Tolong Isi Name"),
    username: z.string().min(1, "Tolong Isi Username"),
    email: z.string().email("Bukan Format Email").min(1, "Tolong Isi Email"),
    password: z.string().min(8, "Min. 8 Karakter"),
    confirmation_password: z.string().min(8, "Min. 8 Karakter"),
    // no_telp: z.string().min(1, "Tolong Isi No. Telpon/HP"),
    company: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .array()
      .min(1, "Min. 1 Perusahaan"),
    jobTypes: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .array()
      .min(1, "Min. 1 Jabatan"),
    role: z.object(
      {
        label: z.string(),
        value: z.string(),
      },
      { invalid_type_error: "Tolong Isi Role" },
    ),
  })
  .refine(
    ({ password, confirmation_password }) => password === confirmation_password,
    { message: "Password & Konfirmasi Password tidak sama" },
  );
const CreateUser = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: "",
      username: "",
      email: "",
      // @ts-expect-error gapapa error gan
      company: null,
      // @ts-expect-error gapapa error gan
      role: null,
      password: "password",
      confirmation_password: "password",
      jobTypes: [],
    },
  });

  const client = useQueryClient();
  const create = k.user.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      router.push("/user");
      await client.invalidateQueries({ queryKey: k.user.all.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <H3 className="mb-4">Buat User Baru +</H3>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((v) => {
            create.mutate({
              data: {
                ...v,
                company_id: v.company.map((vv) => vv.value),
                role_id: v.role.value ?? "",
                job_types: v.jobTypes.map((vv) => vv.value),
              },
            });
          })}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Nama Lengkap" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Nama Pengguna" />
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
                <FormItem className="col-span-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Masukkan Nama Email"
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
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perusahaan</FormLabel>
                  <FormControl>
                    <SelectAsync
                      {...field}
                      isMulti
                      selectRef={field.ref}
                      loadOptions={loadCompanyOptions}
                      placeholder="Pilih Perusahaan"
                      additional={{ page: 1 }}
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <SelectAsync
                      {...field}
                      loadOptions={loadRoleOptions}
                      placeholder="Pilih Role"
                      additional={{ page: 1 }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jabatan</FormLabel>
                  <FormControl>
                    <SelectAsync
                      {...field}
                      cacheUniqs={[form.watch("company")]}
                      isClearable
                      isMulti
                      loadOptions={loadJobTypeOptions}
                      placeholder="Pilih Jabatan"
                      additional={{ page: 1 }}
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Masukkan Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmation_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Masukkan Konfirmasi Password"
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

export default CreateUser;
