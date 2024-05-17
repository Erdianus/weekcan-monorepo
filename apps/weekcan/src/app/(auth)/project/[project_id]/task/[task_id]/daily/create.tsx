import { SVGProps, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Paperclip, SendHorizontal } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import { dailyTaskFormSchema } from "@hktekno/api/routers/project/task/daily/schema";
import Dropzone from "@hktekno/ui/components/dropzone";
import FileIcon from "@hktekno/ui/components/file-icon";
import { Button } from "@hktekno/ui/components/ui/button";
import { Calendar } from "@hktekno/ui/components/ui/calendar";
import { Input } from "@hktekno/ui/components/ui/input";
import { Label } from "@hktekno/ui/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@hktekno/ui/components/ui/popover";
import Spinner from "@hktekno/ui/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@hktekno/ui/components/ui/tooltip";
import { date4Y2M2D } from "@hktekno/ui/lib/date";

dayjs.extend(isBetween);

const dailyTaskCreateForm = dailyTaskFormSchema.extend({
  file: z.instanceof(File).array().optional(),
  date: z.date(),
  is_done: z.boolean(),
  is_permanent: z.boolean(),
});

type CreateForm = z.infer<typeof dailyTaskCreateForm>;

function ThumbsUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z"
      ></path>
    </svg>
  );
}

// NOTE: pakai inputan manual
// react hook form gak work di di portal
const CreateDailyTask = () => {
  const params = useParams<{ task_id: string }>();
  const initData = useMemo(() => {
    return {
      desc_detail_task: "",
      date: dayjs().toDate(),
      is_done: false,
      task_project_id: params.task_id,
      file: undefined,
      is_permanent: true,
    };
  }, []);

  const [data, setData] = useState<CreateForm>(initData);

  const client = useQueryClient();
  const { data: task } = k.project.task.single.useQuery({
    variables: { id: params.task_id },
  });
  const create = k.project.task.daily.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      setData((o) => ({
        ...o,
        desc_detail_task: "",
        file: undefined,
        is_done: false,
      }));
      await client.invalidateQueries({
        queryKey: k.project.task.daily.dateGroupInfinite.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  useEffect(() => {
    if (task) {
      if (
        dayjs().isBetween(
          task.data.start_date,
          dayjs(task.data.end_date),
          "day",
        )
      )
        return;

      if (dayjs().isBefore(task.data.start_date, "day")) {
        setData((o) => ({ ...o, date: dayjs(task.data.start_date).toDate() }));
      } else if (dayjs().isAfter(task.data.end_date, "day")) {
        setData((o) => ({ ...o, date: dayjs(task.data.end_date).toDate() }));
      }
    }
  }, [task]);

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();

          create.mutate({
            data: {
              desc_detail_task: data.desc_detail_task,
              date: date4Y2M2D(data.date),
              is_done: Number(data.is_done),
              task_project_id: params.task_id,
              is_permanent: Number(data.is_permanent),
              file: data.file,
            },
          });
        }}
        className="fixed bottom-0 left-0 z-50 flex w-full flex-1 items-center gap-3 rounded-lg rounded-b-none border bg-background p-2 md:sticky"
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
            <button
              type="button"
              className="flex h-9 w-14 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background text-muted-foreground shadow-md"
            >
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
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              defaultMonth={dayjs(task?.data.start_date).toDate()}
              disabled={{
                before: dayjs(task?.data.start_date).toDate(),
                after: dayjs(task?.data.end_date).toDate(),
              }}
              fromMonth={dayjs(task?.data.start_date).toDate()}
              toMonth={dayjs(task?.data.end_date).toDate()}
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
              <div className="flex flex-wrap gap-3">
                {data.file?.map((f) => {
                  if (f.type.includes("image/"))
                    return (
                      <img src={URL.createObjectURL(f)} className="h-8 w-8" />
                    );

                  return <FileIcon text={f.name} />;
                })}
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
                  setData((o) => {
                    const f = o.file ?? [];
                    return { ...o, file: [...f, ...files] };
                  });
                }}
              />
              <Input
                className="mt-2"
                placeholder="atau paste disini untuk upload"
                onPaste={(event) => {
                  event.preventDefault();
                  if (event.clipboardData) {
                    const items = event?.clipboardData?.items;
                    for (let i = 0; i < items?.length; i++) {
                      const item = items[i];
                      if (
                        item?.kind === "file" &&
                        item.type.includes("image/")
                      ) {
                        const blob = item?.getAsFile();
                        if (blob)
                          setData((o) => {
                            const f = o.file ?? [];
                            return { ...o, file: [...f, blob] };
                          });

                        /* setImg(URL.createObjectURL(blob as Blob));
                        setFileName(undefined);
                        setValue("file", blob);
                        clearErrors("file"); */
                      }
                    }
                  }
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              onClick={() => setData((o) => ({ ...o, is_done: !o.is_done }))}
              variant={"ghost"}
              size={"icon"}
            >
              <ThumbsUp
                data-done={data.is_done ? "done" : "not-done"}
                className="stroke-muted-foreground text-background data-[done=done]:stroke-transparent  data-[done=done]:text-primary"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Tandai Selesai</TooltipContent>
        </Tooltip>

        <Button className="rounded-full" size={"icon"}>
          {create.isPending ? <Spinner /> : <SendHorizontal />}
        </Button>
      </form>
    </>
  );
};

export default CreateDailyTask;
