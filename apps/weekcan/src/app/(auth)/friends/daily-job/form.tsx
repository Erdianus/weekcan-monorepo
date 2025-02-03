"use client";

import type { MouseEventHandler } from "react";
import type { UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, XCircle } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { inferData, k } from "@hktekno/api";
import { dailyicon } from "@hktekno/ui/components/icon/daily-status-time";
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

const Sunrise = dailyicon["Pagi"];
const Noon = dailyicon["Siang"];
const Sunset = dailyicon["Sore"];
const Night = dailyicon["Malam"];

export const FormDailyJob = ({
  onSubmitAction,
  isPending,
  defaultValues,
}: {
  onSubmitAction: (value: z.infer<typeof formSchema>) => void;
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
        <form onSubmit={form.handleSubmit(onSubmitAction)} className="">
          <div className="max-h-96 overflow-y-auto">
            <div className="mb-4 flex items-center gap-1 font-bold">
              {Sunrise && <Sunrise />}
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
                    time: "08:00:00",
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
                  <DailyItem
                    key={`pagi-${daily.id}`}
                    onDelete={() => {
                      delDailyJobs(i);
                    }}
                    form={form}
                    i={i}
                    taskPlaceholder="Isi Kerjaan Pagi"
                  />
                );
              })}
            </div>
            <div className="mb-4 flex items-center gap-1 font-bold">
              {Noon && <Noon />}
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
                    time: "13:00:00",
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
                  <DailyItem
                    key={`siang-${daily.id}`}
                    onDelete={() => {
                      delDailyJobs(i);
                    }}
                    form={form}
                    i={i}
                    taskPlaceholder="Isi Kerjaan Siang"
                  />
                );
              })}
            </div>{" "}
            <div className="mb-4 flex items-center gap-1 font-bold">
              {Sunset && <Sunset />}
              Sore
              <Button
                variant={"outline"}
                size={"icon"}
                type="button"
                className="h-8 w-8"
                onClick={() => {
                  addDailyJobs({
                    id: crypto.randomUUID(),
                    text: "",
                    status: "Sore",
                    time: "16:00:00",
                  });
                }}
              >
                <Plus size={16} />
              </Button>
              <Separator className="flex-1" />
            </div>
            <div className="">
              {fieldDailyJobs.map((daily, i) => {
                if (daily.status !== "Sore") return null;
                return (
                  <DailyItem
                    key={`sore-${daily.id}`}
                    onDelete={() => {
                      delDailyJobs(i);
                    }}
                    form={form}
                    i={i}
                    taskPlaceholder="Isi Kerjaan Sore"
                  />
                );
              })}
            </div>{" "}
            <div className="mb-4 flex items-center gap-1 font-bold">
              {Night && <Night />}
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
                    time: "19:00:00",
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
                  <DailyItem
                    key={`malam-${daily.id}`}
                    onDelete={() => {
                      delDailyJobs(i);
                    }}
                    form={form}
                    i={i}
                    taskPlaceholder="Isi Kerjaan Malam"
                  />
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

const DailyItem = ({
  i,
  form,
  onDelete,
  taskPlaceholder,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  i: number;
  onDelete: MouseEventHandler<HTMLButtonElement> | undefined;
  taskPlaceholder?: string;
}) => {
  return (
    <>
      <div className="relative mb-4 grid grid-cols-1 gap-4 rounded-lg border px-3 py-4 sm:grid-cols-2">
        <Button
          size={"icon"}
          variant={"ghost"}
          type="button"
          className="absolute -top-4 right-2 rounded-full"
          /* onClick={() => {
            delDailyJobs(i);
          }} */
          onClick={onDelete}
        >
          <XCircle size={18} className="text-destructive-foreground" />
        </Button>
        <FormField
          control={form.control}
          name={`daily_jobs.${i}.text`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder={taskPlaceholder ?? "Isi Kerjaan"}
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
                        <SelectItem
                          key={`time-${v.label}-${i}`}
                          value={v.value}
                        >
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
    </>
  );
};

export { DailyItem };
