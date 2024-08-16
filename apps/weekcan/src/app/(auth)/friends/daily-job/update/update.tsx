"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { CloudSun, Moon, Plus, Sun, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import { Select } from "@hktekno/ui/components/select";
import { Button } from "@hktekno/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@hktekno/ui/components/ui/form";
import { Input } from "@hktekno/ui/components/ui/input";
import { Separator } from "@hktekno/ui/components/ui/separator";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import useUserStore from "@hktekno/ui/lib/store/useUserStore";

const formSchema = z
  .object({
    latitude: z.number().default(0),
    longitude: z.number().default(0),
    ket: z.string().optional(),
    status: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .nullish(),
    location_text: z.string().optional(),
    daily_jobs: z
      .object({
        id: z.number(),
        user_id: z.number(),
        text: z.string().min(1, "Tolong Isi Tugas Harian"),
        status: z.string(),
      })
      .array()
      .min(0),
  })
  .superRefine((val, ctx) => {
    if (val.status && !val.ket) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["ket"],
        message: "Tolong Isi Keterangan",
      });
    }

    if (!val.status && val.daily_jobs.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["daily_jobs"],
        message: "Tolong Isi Tugas Minimal 1",
      });
    }
  });

const UpdateDailyJob = () => {
  const [id, setID] = useState(1);
  const user_id = useUserStore((s) => s.id);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      latitude: 0,
      longitude: 0,
      ket: "",
      status: null,
      location_text: "",
      daily_jobs: [],
    },
  });

  const client = useQueryClient();
  const { data, isLoading } = k.company.daily_job.single.attendance.useQuery({
    variables: { user_id: `${user_id}` },
    enabled: !!user_id,
  });
  const isload = !data && isLoading && !user_id;
  const update = k.company.daily_job.update.attendance.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      router.push(`/friends/daily-job`);
      await client.invalidateQueries({
        queryKey: k.company.daily_job.single.attendance.getKey({
          user_id: `${user_id}`,
        }),
      });
      await client.invalidateQueries({
        queryKey: k.company.daily_job.users.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  useEffect(() => {
    if (data) {
      form.reset({
        ket: data.ket ?? "",
        latitude: data.latitude,
        longitude: data.longitude,
        status:
          data.status && data.status !== "Hadir"
            ? {
                label: data.status,
                value: data.status,
              }
            : null,
        daily_jobs: data.dailyJob?.map((d, i) => ({
          id: i + 1,
          user_id: Number(user_id),
          status: d.status,
          text: d.text,
        })),
        location_text: data.location_text,
      });
    }
  }, [data]);

  return (
    <>
      <H3 className="mb-4">Edit Tugas</H3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((v) => {
            update.mutate({
              id: `${data?.attendance_id}`,
              data: {
                status: v.status?.value ?? "In",
                user_id: `${user_id}`,
                latitude: 0,
                longitude: 0,
                daily_jobs: v.daily_jobs.map((dj) => ({
                  ...dj,
                  date: dayjs().format("YYYY-MM-DD"),
                })),
                ket: v.ket && v.status ? v.ket : "-",
                location_text: v.location_text ? v.location_text : "-",
                date: data?.date ?? dayjs().format("YYYY-MM-DD"),
                time: data?.time ?? dayjs().format("HH:mm:ss"),
              },
            });
          })}
        >
          <div className="mb-4 grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="location_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lokasi</FormLabel>
                  <FormControl isloading={isload}>
                    <Input {...field} placeholder="Masukkan Lokasi" />
                  </FormControl>
                  <FormDescription>Kosongkan jika dikantor</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl isloading={isload}>
                    <Select
                      options={["Izin", "Sakit"].map((v) => ({
                        label: v,
                        value: v,
                      }))}
                      isClearable
                      value={field.value}
                      onChange={(e) => {
                        if (!e) {
                          form.setValue("daily_jobs", []);
                          form.setValue("ket", "");
                        }
                        field.onChange(e);
                      }}
                      placeholder="Pilih Status"
                    />
                  </FormControl>
                  <FormDescription>Kosongkan jika hadir</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!!form.watch("status") && (
            <div className="mb-4">
              <FormField
                control={form.control}
                name="ket"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Keterangan {form.watch("status")?.value}
                    </FormLabel>
                    <FormControl isloading={isload}>
                      <Input {...field} placeholder="Masukkan Keterangan" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <div className={form.watch("status") ? "hidden" : ""}>
            <div className="mb-4 flex items-center gap-1 font-bold">
              <CloudSun />
              Pagi
              <Button
                variant={"outline"}
                size={"icon"}
                type="button"
                className="h-8 w-8"
                onClick={() => {
                  const value: z.infer<
                    typeof formSchema
                  >["daily_jobs"][number] = {
                    id,
                    text: "",
                    status: "Pagi",
                    user_id: +user_id,
                  };
                  form.setValue("daily_jobs", [
                    ...form.watch("daily_jobs"),
                    value,
                  ]);
                  setID((o) => o + 1);
                }}
              >
                <Plus size={16} />
              </Button>
              <Separator className="flex-1" />
            </div>
            {form.watch("daily_jobs").map((daily, i) => {
              if (daily.status !== "Pagi") return null;
              return (
                <div className="mb-2" key={`pagi-${daily.id}`}>
                  <FormField
                    control={form.control}
                    name={`daily_jobs.${i}.text`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex">
                          <Input
                            {...field}
                            placeholder="Isi Kerjaan Pagi"
                            className="rounded-r-none"
                          />
                          <Button
                            type="button"
                            variant={"ghost"}
                            size={"icon"}
                            className="rounded-l-none"
                            onClick={() => {
                              form.setValue(
                                "daily_jobs",
                                form
                                  .watch("daily_jobs")
                                  .filter((v) => v.id !== daily.id),
                              );
                            }}
                          >
                            <X />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              );
            })}
            <div className="mb-4 flex items-center gap-1 font-bold">
              <Sun />
              Siang
              <Button
                variant={"outline"}
                size={"icon"}
                type="button"
                className="h-8 w-8"
                onClick={() => {
                  const value: z.infer<
                    typeof formSchema
                  >["daily_jobs"][number] = {
                    id,
                    text: "",
                    status: "Siang",
                    user_id: +user_id,
                  };
                  form.setValue("daily_jobs", [
                    ...form.watch("daily_jobs"),
                    value,
                  ]);
                  setID((o) => o + 1);
                }}
              >
                <Plus size={16} />
              </Button>
              <Separator className="flex-1" />
            </div>
            {form.watch("daily_jobs").map((daily, i) => {
              if (daily.status !== "Siang") return null;
              return (
                <div className="mb-2" key={`siang-${daily.id}`}>
                  <FormField
                    control={form.control}
                    name={`daily_jobs.${i}.text`}
                    render={({ field }) => (
                      <FormItem className="">
                        <div className="flex">
                          <Input
                            {...field}
                            placeholder="Isi Kerjaan Siang"
                            className="rounded-r-none"
                          />
                          <Button
                            type="button"
                            variant={"ghost"}
                            size={"icon"}
                            className="rounded-l-none"
                            onClick={() => {
                              form.setValue(
                                "daily_jobs",
                                form
                                  .watch("daily_jobs")
                                  .filter((v) => v.id !== daily.id),
                              );
                            }}
                          >
                            <X />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              );
            })}
            <div className="mb-4 flex items-center gap-1 font-bold">
              <Moon />
              Malam
              <Button
                variant={"outline"}
                size={"icon"}
                type="button"
                className="h-8 w-8"
                onClick={() => {
                  const value: z.infer<
                    typeof formSchema
                  >["daily_jobs"][number] = {
                    id,
                    text: "",
                    status: "Malam",
                    user_id: +user_id,
                  };
                  form.setValue("daily_jobs", [
                    ...form.watch("daily_jobs"),
                    value,
                  ]);
                  setID((o) => o + 1);
                }}
              >
                <Plus size={16} />
              </Button>
              <Separator className="flex-1" />
            </div>
            {form.watch("daily_jobs").map((daily, i) => {
              if (daily.status !== "Malam") return null;
              return (
                <div className="mb-2" key={`malam-${daily.id}`}>
                  <FormField
                    control={form.control}
                    name={`daily_jobs.${i}.text`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex">
                          <Input
                            {...field}
                            placeholder="Isi Kerjaan Malam"
                            className="rounded-r-none"
                          />
                          <Button
                            type="button"
                            variant={"ghost"}
                            size={"icon"}
                            className="rounded-l-none"
                            onClick={() => {
                              form.setValue(
                                "daily_jobs",
                                form
                                  .watch("daily_jobs")
                                  .filter((v) => v.id !== daily.id),
                              );
                            }}
                          >
                            <X />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              );
            })}
            <p className="mb-4 text-sm text-destructive">
              {form.formState.errors.daily_jobs?.message ??
                form.formState.errors.daily_jobs?.root?.message}
            </p>
          </div>
          <Button disabled={update.isPending}>
            {update.isPending ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UpdateDailyJob;
