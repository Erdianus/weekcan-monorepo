"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { CloudSun, Moon, Plus, Sun, XCircle } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { inferData, k } from "@hktekno/api";
import { Button } from "@hktekno/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@hktekno/ui/components/ui/form";
import { Input } from "@hktekno/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@hktekno/ui/components/ui/select";
import { Separator } from "@hktekno/ui/components/ui/separator";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { optionsTime2 } from "@hktekno/ui/lib/select";

const formSchema = z.object({
  daily_jobs: z
    .object({
      id: z.union([z.string(), z.number()]),
      time: z.string(),
      text: z.string().min(1, "Tolong Isi Tugas Harian"),
      status: z.string(),
    })
    .array()
    .min(0),
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      daily_jobs: defaultValues?.dailyJob ?? [],
    },
  });

  const {
    fields: fieldDailyJobs,
    append: addDailyJobs,
    remove: delDailyJobs,
  } = useFieldArray({
    control: form.control,
    name: "daily_jobs",
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="">
          <div className="max-h-96 overflow-y-auto">
            <div className="mb-4 flex items-center gap-1 font-bold">
              <CloudSun />
              Pagi
              <Button
                variant={"outline"}
                size={"icon"}
                type="button"
                className="h-8 w-8"
                onClick={() => {
                  addDailyJobs({
                    id: crypto.randomUUID(),
                    text: "",
                    status: "Pagi",
                    time: dayjs().format("HH:00:00"),
                  });
                }}
              >
                <Plus size={16} />
              </Button>
              <Separator className="flex-1" />
            </div>
            <div className="">
              {fieldDailyJobs.map((daily, i) => {
                if (daily.status !== "Pagi") return null;
                return (
                  <div
                    className="relative mb-4 grid grid-cols-1 gap-4 rounded-lg border px-3 py-4 sm:grid-cols-2"
                    key={`pagi-${daily.id}`}
                  >
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      type="button"
                      className="absolute -top-4 right-2 rounded-full"
                      onClick={() => {
                        delDailyJobs(i);
                      }}
                    >
                      <XCircle
                        size={18}
                        className="text-destructive-foreground"
                      />
                    </Button>
                    <FormField
                      control={form.control}
                      name={`daily_jobs.${i}.text`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Isi Kerjaan Pagi"
                              className="rounded-r-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`daily_jobs.${i}.time`}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih Waktu" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {optionsTime2().map((v) => {
                                  return (
                                    <SelectItem value={v.value}>
                                      {v.label}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
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
                  addDailyJobs({
                    id: crypto.randomUUID(),
                    text: "",
                    status: "Siang",
                    time: dayjs().format("HH:00:00"),
                  });
                }}
              >
                <Plus size={16} />
              </Button>
              <Separator className="flex-1" />
            </div>
            <div className="">
              {fieldDailyJobs.map((daily, i) => {
                if (daily.status !== "Siang") return null;
                return (
                  <div
                    className="relative mb-4 grid grid-cols-1 gap-4 rounded-lg border px-3 py-4 sm:grid-cols-2"
                    key={`pagi-${daily.id}`}
                  >
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      type="button"
                      className="absolute -top-4 right-2 rounded-full"
                      onClick={() => {
                        delDailyJobs(i);
                      }}
                    >
                      <XCircle
                        size={18}
                        className="text-destructive-foreground"
                      />
                    </Button>
                    <FormField
                      control={form.control}
                      name={`daily_jobs.${i}.text`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Isi Kerjaan Siang"
                              className="rounded-r-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`daily_jobs.${i}.time`}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih Waktu" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {optionsTime2().map((v) => {
                                  return (
                                    <SelectItem value={v.value}>
                                      {v.label}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
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
                  addDailyJobs({
                    id: crypto.randomUUID(),
                    text: "",
                    status: "Malam",
                    time: dayjs().format("HH:00:00"),
                  });
                }}
              >
                <Plus size={16} />
              </Button>
              <Separator className="flex-1" />
            </div>
            <div className="">
              {fieldDailyJobs.map((daily, i) => {
                if (daily.status !== "Malam") return null;
                return (
                  <div
                    className="relative mb-4 grid grid-cols-1 gap-4 rounded-lg border px-3 py-4 sm:grid-cols-2"
                    key={`malam-${daily.id}`}
                  >
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      type="button"
                      className="absolute -top-4 right-2 rounded-full"
                      onClick={() => {
                        delDailyJobs(i);
                      }}
                    >
                      <XCircle
                        size={18}
                        className="text-destructive-foreground"
                      />
                    </Button>
                    <FormField
                      control={form.control}
                      name={`daily_jobs.${i}.text`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Isi Kerjaan Malam"
                              className="rounded-r-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`daily_jobs.${i}.time`}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih Waktu" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {optionsTime2().map((v) => {
                                  return (
                                    <SelectItem value={v.value}>
                                      {v.label}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
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
