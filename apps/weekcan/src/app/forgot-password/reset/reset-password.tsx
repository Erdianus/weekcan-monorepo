"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@hktekno/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@hktekno/ui/components/ui/card";
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
import Axios from "@hktekno/utils/axios";

const formSchema = z
  .object({
    email: z.string().nullish(),
    reset_token: z.string().nullish(),
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

function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [viewPassword, setViewPassword] = useState(false);

  const update = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async (v: z.infer<typeof formSchema>) => {
      const res = await Axios.put("/reset-password", v);

      return res.data as { message: string };
    },
    onSuccess: ({ message }) => {
      toast.success(message);
      router.replace("/login");
    },
    onError: ({ message }) => toast.error(message),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: searchParams.get("email"),
      reset_token: searchParams.get("reset_token"),
      new_password: "",
      confirm_password: "",
    },
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Masukkan Password Baru kalian di bawah ini
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((v) => {
            update.mutate(v);
          })}
        >
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Baru</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={viewPassword ? "text" : "password"}
                        placeholder="Masukkan Password"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Masukkan Konfirmasi Password"
                        type={viewPassword ? "text" : "password"}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
          </CardContent>
          <CardFooter>
            <Button disabled={update.isPending} className="w-full">
              {update.isPending ? <Spinner /> : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

export default ResetPassword;
