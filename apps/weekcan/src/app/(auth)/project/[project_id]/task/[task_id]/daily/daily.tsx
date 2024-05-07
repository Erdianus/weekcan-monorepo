"use client";

import { useEffect, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Paperclip, SendHorizontal } from "lucide-react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import { dailyTaskFormSchema } from "@hktekno/api/routers/project/task/daily/schema";
import Dropzone from "@hktekno/ui/components/dropzone";
import Flashlist from "@hktekno/ui/components/flashlist";
import Loading from "@hktekno/ui/components/loading";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { Button } from "@hktekno/ui/components/ui/button";
import { Calendar } from "@hktekno/ui/components/ui/calendar";
import { Checkbox } from "@hktekno/ui/components/ui/checkbox";
import { DateRangePicker } from "@hktekno/ui/components/ui/date-picker";
import { Input } from "@hktekno/ui/components/ui/input";
import { Label } from "@hktekno/ui/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@hktekno/ui/components/ui/popover";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { date4Y2M2D } from "@hktekno/ui/lib/date";

const dailyTaskCreateForm = dailyTaskFormSchema.extend({
  date: z.date(),
  is_done: z.boolean(),
  is_permanent: z.boolean(),
});

type CreateForm = z.infer<typeof dailyTaskCreateForm>;

// NOTE: pakai inputan manual
// react hook form gak work di di portal
const CreateDailyTask = () => {
  const params = useParams<{ task_id: string }>();
  const [data, setData] = useState<CreateForm>({
    desc_detail_task: "",
    date: dayjs().toDate(),
    is_done: false,
    task_project_id: params.task_id,
    file: null,
    is_permanent: true,
  });

  const client = useQueryClient();
  const create = k.project.task.daily.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.project.task.daily.dateGroup.getKey(),
      });
    },
    onError: ({ message }) => toast.message(message),
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          create.mutate({
            data: {
              desc_detail_task: data.desc_detail_task,
              date: date4Y2M2D(data.date),
              is_done: Number(data.is_done),
              task_project_id: params.task_id,
              is_permanent: Number(data.is_permanent),
            },
          });
        }}
        className="sticky bottom-0 left-0 flex w-full flex-1 items-center gap-3 rounded-lg rounded-b-none border bg-background p-2"
      >
        <Input
          value={data.desc_detail_task}
          placeholder="Tulis Perihal"
          className="flex-1"
          autoFocus
          onChange={(e) =>
            setData((o) => ({ ...o, desc_detail_task: e.target.value }))
          }
        />
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex h-9 w-14 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background text-muted-foreground shadow-md">
              <div className="w-full border-b">
                <p className="text-center text-xs font-semibold uppercase tracking-wide">
                  {dayjs(data.date).format("MMM/YY")}
                </p>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center">
                <p className="text-center text-xs font-bold leading-none">
                  {dayjs(data.date).format("DD")}
                </p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={data.date}
              onSelect={(e) =>
                setData((o) => ({ ...o, date: e ?? dayjs().toDate() }))
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="text-muted-foreground"
              type="button"
              variant={"outline"}
              size={"icon"}
            >
              <Paperclip />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 max-w-80">
            <div className="flex max-w-80 flex-col">
              <div className="mb-3 flex items-center justify-between">
                <h4 className=" font-medium leading-none">Tambah File</h4>
                {!!data.file && (
                  <p
                    className="cursor-pointer text-xs text-muted-foreground hover:underline"
                    onClick={() => {
                      setData((o) => ({ ...o, file: undefined }));
                    }}
                  >
                    clear
                  </p>
                )}
              </div>
              <Label className="mb-1">File</Label>
              <div className="mb-1 truncate text-xs text-muted-foreground">
                {data.file?.name ?? ""}
              </div>
              <Dropzone
                accept={{
                  "application/msword": [".doc"],
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    [".docx"],
                  "application/vnd.ms-excel": [".xls"],
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    [".xlsx"],
                  "text/csv": [".csv"],
                  "image/png": [".png"],
                  "application/pdf": [".pdf"],
                  "image/jpeg": [".jpg", ".jpeg"],
                }}
                onDrop={(files) => {
                  setData((o) => ({ ...o, file: files[0] }));
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
        <Checkbox
          className="h-9 w-9"
          checked={data.is_done}
          onClick={() => setData((o) => ({ ...o, is_done: !o.is_done }))}
        />
        <Button className="rounded-full" size={"icon"}>
          {create.isPending ? <Spinner /> : <SendHorizontal />}
        </Button>
      </form>
    </>
  );
};

const DailyTaskProject = ({ id }: { id: string }) => {
  const [mount, setMount] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const variables = Object.fromEntries(searchParams.entries());
  const { data: dailys } = k.project.task.daily.dateGroup.useQuery({
    variables: { ...variables, task_project_id: id },
  });

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      <DateRangePicker
        mode="range"
        defaultValue={
          searchParams.get("from")
            ? {
                from: dayjs(searchParams.get("from")).toDate(),
                to: searchParams.get("to")
                  ? dayjs(searchParams.get("to")).toDate()
                  : undefined,
              }
            : undefined
        }
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const params = new URLSearchParams(searchParams);

          if (e?.from) params.set("from", `${date4Y2M2D(e.from)}`);
          if (e?.to) params.set("to", `${date4Y2M2D(e.to)}`);

          if (!e?.from) params.delete("from");
          if (!e?.to) params.delete("to");

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
      <div className="relative mt-4 min-h-svh">
        <Flashlist
          isloading={!dailys}
          loading={
            <Loading>
              <Skeleton className="mb-2 h-10 w-1/2 rounded-lg" />
            </Loading>
          }
          isfallback={Array.isArray(dailys?.data)}
          fallback={<div>Tidak Ada Data Perihal </div>}
        >
          {Object.keys(dailys?.data ?? {}).map((date) => {
            const dailyList = dailys?.data[date];
            return (
              <div className="mb-2">
                <div className="sticky top-16 flex w-full items-center justify-center pb-1 sm:justify-start">
                  <Badge>{date}</Badge>
                </div>
                {dailyList?.map((daily) => (
                  <div className="mb-2 rounded-lg p-2 dark:bg-main-900 dark:text-main-400 sm:w-1/2">
                    {daily.desc_detail_task}
                  </div>
                ))}
              </div>
            );
          })}
        </Flashlist>
      </div>

      {mount &&
        createPortal(
          <CreateDailyTask />,
          // @ts-expect-error gapapa error gan
          document.querySelector("main"),
        )}
    </>
  );
};

export default DailyTaskProject;
