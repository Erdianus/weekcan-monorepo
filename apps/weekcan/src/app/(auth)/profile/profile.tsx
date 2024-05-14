"use client";

import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { k } from "@hktekno/api";
import { userUpdateFormSchema } from "@hktekno/api/routers/user/schema";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
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
import { shortName } from "@hktekno/ui/lib/utils";

const userUpdateForm = userUpdateFormSchema.omit({
  role_id: true,
  role: true,
  company: true,
  company_id: true,
});

const Profile = ({ id }: { id: string }) => {
  const { data: user } = k.user.single.useQuery({ variables: { id } });

  const form = useForm<z.infer<typeof userUpdateForm>>({
    resolver: zodResolver(userUpdateForm),
    values: {
      name: user?.data.name ?? "",
      username: user?.data.username ?? "",
      email: user?.data.email ?? "",
    },
  });

  const client = useQueryClient();
  const update = k.user.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.user.single.getKey({ id }),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <Avatar className="mb-4 h-16 w-16">
        <AvatarImage src={user?.data.picture_link} />
        <AvatarFallback>{shortName(user?.data.name)}</AvatarFallback>
      </Avatar>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((v) => {
            update.mutate({
              id,
              data: { ...v, role_id: user?.data.role_id ?? "" },
            });
          })}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Nama Lengkap" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Nama Pengguna" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button>{update.isPending ? <Spinner /> : "Update Profile"} </Button>
        </form>
      </Form>
    </>
  );
};

export default Profile;
