"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import k, { useQueryClient } from "@repo/api/kit";
import { userCreateFormSchema } from "@repo/api/router/user/schema";
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
import { loadCompanyOptions, loadRoleOptions } from "@ui/lib/select";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const userFormSchema = userCreateFormSchema
  .omit({ role_id: true, company_id: true })
  .refine(
    ({ confirmation_password, password }) => confirmation_password === password,
    {
      message: "Password dan Konfirmasi Password tidak sama",
      path: ["confirmation_password"],
    },
  );
const CreateUser = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    values: {
      name: "",
      username: "",
      email: undefined,
      // @ts-ignore
      company: null,
      // @ts-ignore
      role: null,
      password: "password",
      confirmation_password: "password",
    },
  });

  const client = useQueryClient();
  const create = k.user.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.user.all.getKey() });
      router.push('/user');
    },
    onError: async ({message}) => toast.error(message)
  });

  return (
    <>
      <H3 className="mb-4">Buat User Baru</H3>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((v) => {
            create.mutate({
              ...v,
              role_id: v.role.value ?? '',
              company_id: v.company.map(({value}) => value),
            })
          })}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Button>{create.isPending ? <Spinner /> : 'Submit'}</Button>
        </form>
      </Form>
    </>
  );
};

export default CreateUser;
