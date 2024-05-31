"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@hktekno/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@hktekno/ui/components/ui/card";
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

const formSchema = z.object({
  email: z.string().email({ message: "Bukan format email yang benar" }),
});

const ForgotPassword = () => {
  const forget = useMutation({
    mutationKey: ["forget"],
    mutationFn: async (v: { email: string }) => {
      const res = await Axios.post("/forget-pass", v);

      return res.data as { message: string };
    },
    onSuccess: ({ message }) => toast.success(message),
    onError: ({ message }) => toast.error(message),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      email: "",
    },
  });
  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Lupa Password</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit((v) => {
              forget.mutate(v);
            })}
          >
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Masukkan Email"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={forget.isPending} className="w-full">
                {forget.isPending ? <Spinner /> : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default ForgotPassword;
