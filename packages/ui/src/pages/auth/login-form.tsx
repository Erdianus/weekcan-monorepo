"use client";

import { Button } from "@ui/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { Input } from "@ui/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "./login-action";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import Spinner from "@ui/components/ui/spinner";
import { Checkbox } from "@ui/components/ui/checkbox";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(1, "Tolong Isi Username"),
  password: z.string().min(1, "Tolong Isi Username"),
});

const ButtonSubmit = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full">{pending ? <Spinner /> : "Sign In"}</Button>
  );
};

function LoginForm() {
  const router = useRouter();
  const [viewPassword, setViewPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          action={async (formdata: FormData) => {
            const res = await loginAction(formdata);

            if (!res.status) {
              toast.error(res.message);
              return;
            }

            router.push("/dashboard");
            toast.success(res.message);
          }}
          className="space-y-4"
        >
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        placeholder="Masukkan Username"
                        required
                        {...field}
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="Masukkan Password"
                        type={viewPassword ? 'text': 'password'}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox checked={viewPassword} onClick={(e) => {
                setViewPassword((o) => !o)
              }} id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Lihat Password
              </label>
            </div>
          </CardContent>
          <CardFooter>
            <ButtonSubmit />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

export { LoginForm };
