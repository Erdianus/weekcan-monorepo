"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import { dailyicon } from "@hktekno/ui/components/icon/daily-status-time";
import { Button } from "@hktekno/ui/components/ui/button";
import { Form } from "@hktekno/ui/components/ui/form";
import { Separator } from "@hktekno/ui/components/ui/separator";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import useUserStore from "@hktekno/ui/lib/store/useUserStore";

import { DailyItem } from "../form";

const formSchema = z.object({
  daily_jobs: z
    .object({
      id: z.union([z.string(), z.number()]),
      time: z.string(),
      text: z.string().min(1, "Tolong Isi Tugas Harian"),
      status: z.string(),
    })
    .array()
    .min(1, "Tolong Isi Kerjaan Harian"),
});

const Sunrise = dailyicon["Pagi"];
const Noon = dailyicon["Siang"];
const Sunset = dailyicon["Sore"];
const Night = dailyicon["Malam"];

const CreateDailyJob = () => {
  const user_id = useUserStore((s) => s.id);
  const router = useRouter();

  const client = useQueryClient();
  const create = k.company.daily_job.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      router.push(`/friends/daily-job`);
      await client.invalidateQueries({
        queryKey: k.company.daily_job.users.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <H3 className="mb-4">Buat Tugas</H3>
      <FormCreateDailyJob
        isPending={create.isPending}
        submit={(v) => {
          create.mutate({
            data: {
              user_id: `${user_id}`,
              date: dayjs().format("YYYY-MM-DD"),
              daily_jobs: v.daily_jobs,
            },
          });
        }}
      />
    </>
  );
};

const FormCreateDailyJob = ({
  submit,
  isPending,
}: {
  submit: (value: z.infer<typeof formSchema>) => void;
  isPending: boolean;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      daily_jobs: [],
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
        <form onSubmit={form.handleSubmit(submit)}>
          <div className="">
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
          <p className="my-4 text-sm text-destructive">
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

export default CreateDailyJob;
