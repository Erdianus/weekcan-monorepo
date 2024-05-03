"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { k } from "@hktekno/api";
import { userUpdateFormSchema } from "@hktekno/api/routers/user/schema";
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
import { loadCompanyOptions, loadRoleOptions } from "@hktekno/ui/lib/select";

const userFormSchema = userUpdateFormSchema.omit({
  role_id: true,
  company_id: true,
});

const UpdateUser = ({ id }: { id: string | number }) => {
  const router = useRouter();

  const { data: user } = k.user.single.useQuery({ variables: { id } });

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    values: {
      name: "",
      username: "",
      email: undefined,
      company: [],
      role: {},
    },
  });

  const client = useQueryClient();
  const update = k.user.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      router.push("/user");
      await client.invalidateQueries({ queryKey: k.user.all.getKey() });
    },
    onError: async ({ message }) => toast.error(message),
  });

  const isload = !user;

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.data.username,
        name: user.data.name,
        email: user.data.email,
        role: {
          label: user.data.role.role_name,
          value: `${user.data.role.id}`,
        },
        company: user.data.company.map((c) => ({
          value: `${c.id}`,
          label: c.company_name,
        })),
      });
    }
  }, [user]);

  return (
    <>
      <H3 className="mb-4">Update Pengguna</H3>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((v) => {
            update.mutate({
              id,
              data: {
                ...v,
                role_id: v.role.value ?? "",
                company_id: v.company.map(({ value }) => value),
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
                  <FormControl isloading={isload}>
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
                  <FormControl isloading={isload}>
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
                  <FormControl isloading={isload}>
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl isloading={isload}>
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
                  <FormControl isloading={isload}>
                    <SelectAsync
                      {...field}
                      isMulti
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
          <Button>{update.isPending ? <Spinner /> : "Submit"}</Button>
        </form>
      </Form>
    </>
  );
};

export default UpdateUser;
