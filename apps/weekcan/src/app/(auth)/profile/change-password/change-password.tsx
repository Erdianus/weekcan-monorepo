"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import { Button } from "@hktekno/ui/components/ui/button";
import { Checkbox } from "@hktekno/ui/components/ui/checkbox";
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

const chpwdFormSchema = z
  .object({
    old_password: z
      .string()
      .min(1, "Tolong Isi Password Lama")
      .min(8, "Password Minimal 8 Karakter"),
    new_password: z
      .string()
      .min(1, "Tolong Isi Password Lama")
      .min(8, "Password Minimal 8 Karakter"),
    confirm_password: z
      .string()
      .min(1, "Tolong Isi Password Lama")
      .min(8, "Password Minimal 8 Karakter"),
  })
  .refine(
    ({ new_password, confirm_password }) => new_password === confirm_password,
    {
      message: "Password dan Konfirmasi Password Tidak Sama",
      path: ["confirm_password"],
    },
  );

const ChangePassword = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const form = useForm<z.infer<typeof chpwdFormSchema>>({
    resolver: zodResolver(chpwdFormSchema),
    values: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const update = k.user.changePassword.useMutation({
    onSuccess: ({ message }) => {
      toast.success(message);
      form.reset();
    },
    onError: ({ message }) => toast.error(message),
  });
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((v) => {
            update.mutate(v);
          })}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="old_password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password Lama</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Masukkan Password Lama"
                      type={viewPassword ? "text" : "password"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password Baru</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Masukkan Password Baru"
                      type={viewPassword ? "text" : "password"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Konfirmasi Password Baru</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Masukkan Konfirmasi Password Baru"
                      type={viewPassword ? "text" : "password"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={viewPassword}
              onClick={() => {
                setViewPassword((o) => !o);
              }}
              id="terms"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Lihat Password
            </label>
          </div>
          <Button>{update.isPending ? <Spinner /> : "Submit"}</Button>
        </form>
      </Form>
    </>
  );
};

export default ChangePassword;
