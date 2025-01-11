"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudSun, Moon, Plus, Sun, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { inferData, k } from "@hktekno/api";
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

const formSchema = z
  .object({
    latitude: z.number().default(0),
    longitude: z.number().default(0),
    ket: z.string(),
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
        user_id: z.union([z.string(), z.number()]),
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

type DailyJobUser = inferData<typeof k.company.daily_job.users>["data"][number];
export const FormDailyJob = ({
  onFormSubmit,
  user_id,
  isPending,
  defaultValues,
}: {
  onFormSubmit: (value: z.infer<typeof formSchema>) => void;
  user_id: string | number;
  isPending: boolean;
  defaultValues?: DailyJobUser;
}) => {
  const [id, setID] = useState(1);

  console.log(`defaultValues: ${defaultValues}`);
  const statusHadirorNot =
    defaultValues?.status === "Hadir" ||
    defaultValues?.status === "Belum Hadir";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      ket: defaultValues?.ket ?? "",
      status: statusHadirorNot
        ? null
        : {
            value: defaultValues?.status ?? "",
            label: defaultValues?.status ?? "",
          },
      daily_jobs: defaultValues?.dailyJob ?? [],
      location_text: defaultValues?.location_text ?? "",
      latitude: defaultValues?.latitude ?? 0,
      longitude: defaultValues?.longitude ?? 0,
    },
    /* values: defaultValues ?? {
      latitude: 0,
      longitude: 0,
      ket: "",
      status: null,
      location_text: "",
      daily_jobs: [],
    }, */
  });
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="location_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lokasi</FormLabel>
                  <FormControl>
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
                  <FormControl>
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
                    <FormControl>
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
            <div className="max-h-24 overflow-y-auto">
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
            </div>
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
            <div className="max-h-24 overflow-y-auto">
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
            </div>{" "}
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
            <div className="max-h-24 overflow-y-auto">
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
            </div>{" "}
          </div>
          <p className="mb-4 text-sm text-destructive">
            {form.formState.errors.daily_jobs?.message ??
              form.formState.errors.daily_jobs?.root?.message}
          </p>

          <Button disabled={isPending}>
            {isPending ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};
