"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import Dropzone from "@hktekno/ui/components/dropzone";
import { Select } from "@hktekno/ui/components/select";
import { Button } from "@hktekno/ui/components/ui/button";
import { DatePicker } from "@hktekno/ui/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@hktekno/ui/components/ui/form";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { Textarea } from "@hktekno/ui/components/ui/textarea";
import { date4Y2M2D } from "@hktekno/ui/lib/date";
import useUserStore from "@hktekno/ui/lib/store/useUserStore";

const formSchema = z.object({
  date: z.date({
    required_error: "Tolong Pilih Tanggal",
    invalid_type_error: "Tolong Isi Tanggal",
  }),
  type_of_absent: z.object({
    label: z.string(),
    value: z.string(),
  }),
  desc: z.string().min(1, "Tolong Isi Alasan"),
  file_path: z.instanceof(File).optional(),
});

const date = new Date();

const absents = ["Izin", "Sakit", "Cuti"].map((v) => ({ label: v, value: v }));

const CreateAbsent = () => {
  const user_id = useUserStore((s) => Number(s.id));
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      desc: "",
      date,
      type_of_absent: {
        label: "Izin",
        value: "Izin",
      },
      file_path: undefined,
    },
  });
  const client = useQueryClient();
  const create = k.absent.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      router.push("/absent");
      await client.invalidateQueries({ queryKey: k.absent.all.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });
  return (
    <>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((v) => {
            create.mutate({
              user_id,
              type_of_absent: v.type_of_absent.value,
              date: date4Y2M2D(v.date),
              desc: v.desc,
              file_path: v.file_path,
            });
          })}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="">Tanggal</FormLabel>
                  <FormControl>
                    <DatePicker
                      className="flex w-full"
                      value={field.value}
                      defaultMonth={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type_of_absent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipe</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      options={absents}
                      placeholder="Pilih Tipe Izin"
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
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alasan</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Isi Alasan" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="file_path"
              render={() => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <div className="truncate text-xs text-muted-foreground">
                    {form.watch("file_path")?.name ?? ""}
                  </div>
                  <FormControl>
                    <Dropzone
                      accept={{
                        /* "application/msword": [".doc"],
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                          [".docx"],
                        "application/vnd.ms-excel": [".xls"],
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                          [".xlsx"],
                        "text/csv": [".csv"], */
                        "image/png": [".png"],
                        "application/pdf": [".pdf"],
                        "image/jpeg": [".jpg", ".jpeg"],
                      }}
                      onDrop={(files) => {
                        console.log(files);
                        form.setValue("file_path", files[0] as unknown as File);
                      }}
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

export default CreateAbsent;
