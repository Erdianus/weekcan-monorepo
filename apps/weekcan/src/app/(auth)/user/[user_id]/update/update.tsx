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

const formSchema = z.object({
  name: z.string().min(1, "Tolong Isi Name"),
  username: z.string().min(1, "Tolong Isi Username"),
  email: z.string().email("Bukan Format Email").min(1, "Tolong Isi Email"),
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
});

const UpdateUser = ({ id }: { id: string | number }) => {
  const router = useRouter();

  const { data: user } = k.user.single.useQuery({
    variables: { id },
    enabled: !!id,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: user?.data.name ?? "",
      username: user?.data.username ?? "",
      email: user?.data.email ?? "",
      company:
        user?.data.company.map((c) => ({
          value: `${c.id}`,
          label: c.company_name,
        })) ?? [],
      // @ts-expect-error gapapa gan
      role: user
        ? {
            label: user.data.role_name,
            value: `${user.data.role.id}`,
          }
        : null,
      jobTypes:
        user?.data.job_types.map((jt) => ({
          label: jt.job_name,
          value: `${jt.id}`,
        })) ?? [],
    },
  });

  const client = useQueryClient();
  const update = k.user.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      router.push("/user");
      await client.invalidateQueries({ queryKey: k.user.all.getKey() });
      await client.invalidateQueries({
        queryKey: k.user.single.getKey({ id }),
      });
    },
    onError: async ({ message }) => toast.error(message),
  });

  return (
    <>
      <H3 className="mb-4">Update Pengguna</H3>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((v) => {
            // console.log(v);
            // return;
            update.mutate({
              id,
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
                      instanceId={"company"}
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
                      instanceId={"Role"}
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
                      instanceId={"job_types"}
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
          <Button>{update.isPending ? <Spinner /> : "Submit"}</Button>
        </form>
      </Form>
    </>
  );
};

export default UpdateUser;
