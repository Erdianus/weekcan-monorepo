"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@hktekno/ui/components/ui/form";
import { Input } from "@hktekno/ui/components/ui/input";

const formSchema = z.object({
  link: z.string().min(1, "Tolong Isi Link Meeting"),
  desc: z.string().min(1, "Tolong Isi Deskripsi"),
  date: z.date({
    required_error: "Tolong Pilih Tanggal",
    invalid_type_error: "Tolong Isi Tanggal",
  }),
  time: z.string().min(1, "Tolong Isi Waktu"),
});

const date = new Date();
export const FormCreateOnlineMeeting = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      link: "",
      desc: "",
      date,
      time: "08:00:00",
    },
  });
  return (
    <>
      <Form {...form}>
        <form className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Link Meeting" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Deskripsi Meeting" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2"></div>
        </form>
      </Form>
    </>
  );
};
