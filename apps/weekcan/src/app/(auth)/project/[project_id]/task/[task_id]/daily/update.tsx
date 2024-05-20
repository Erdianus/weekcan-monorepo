import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { Paperclip, SendHorizontal, X } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import { dailyTaskFormSchema } from "@hktekno/api/routers/project/task/daily/schema";
import Dropzone from "@hktekno/ui/components/dropzone";
import FileIcon from "@hktekno/ui/components/file-icon";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertPrimitiveContent,
} from "@hktekno/ui/components/ui/alert-dialog";
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
import { ThumbsUp } from "@hktekno/ui/icon";
import { date4Y2M2D } from "@hktekno/ui/lib/date";

const dailyTaskUpdateForm = dailyTaskFormSchema.extend({
  date: z.date(),
  is_done: z.boolean(),
  file: z.instanceof(File).array().optional(),
  is_permanent: z.boolean(),
});

type UpdateTask = z.infer<typeof dailyTaskUpdateForm>;

const UpdateDailyTask = ({
  open,
  id,
  onClose,
}: {
  open: boolean;
  id: string;
  onClose: () => void;
}) => {
  const params = useParams<{ task_id: string }>();
  const [data, setData] = useState<UpdateTask>({
    task_project_id: params.task_id,
    desc_detail_task: "",
    is_done: false,
    is_permanent: false,
    date: dayjs().toDate(),
  });

  const { data: task } = k.project.task.single.useQuery({
    variables: { id: params.task_id },
  });

  const { data: daily } = k.project.task.daily.single.useQuery({
    variables: { id },
  });

  const client = useQueryClient();
  const update = k.project.task.daily.update.useMutation();

  const updateFile = k.project.task.daily.updateFile.useMutation();

  useEffect(() => {
    if (daily) {
      setData((o) => ({
        ...o,
        ...daily.data,
        file: undefined,
        date: dayjs(daily.data.date).toDate(),
      }));
    }
  }, [daily]);

  return (
    <>
      <AlertDialog open={open} onOpenChange={onClose}>
        <AlertDialogPortal>
          <AlertDialogOverlay />
          <AlertPrimitiveContent>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();

                const promise: Promise<{ message: string }>[] = [];

                if (
                  data.desc_detail_task !== daily?.data.desc_detail_task ||
                  date4Y2M2D(data.date) !== daily.data.date ||
                  data.is_done !== daily.data.is_done
                ) {
                  const dailyUpdate = update.mutateAsync({
                    id,
                    data: {
                      desc_detail_task: data.desc_detail_task,
                      date: date4Y2M2D(data.date),
                      is_done: Number(data.is_done),
                      task_project_id: params.task_id,
                    },
                  });
                  promise.push(dailyUpdate);
                }

                if (data.file && data.file.length > 0) {
                  const fileUpdate = updateFile.mutateAsync({
                    id,
                    data: { file: data.file[0], is_permanent: 0 },
                  });

                  promise.push(fileUpdate);
                }

                try {
                  const res = await Promise.all(promise);

                  toast.success(res[0]?.message);

                  setData((o) => ({
                    ...o,
                    desc_detail_task: "",
                    file: undefined,
                    is_done: false,
                  }));
                  onClose();
                  await client.invalidateQueries({
                    queryKey: k.project.task.daily.dateGroupInfinite.getKey(),
                  });
                } catch (e) {
                  if (e instanceof AxiosError) toast.error(e.message);
                }
              }}
              className="fixed bottom-0 left-0 z-50 flex w-full flex-1 items-center gap-3 rounded-lg rounded-b-none border bg-background p-2"
            >
              <AlertDialogCancel onClick={onClose}>
                <X />
              </AlertDialogCancel>
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
                            <img
                              src={URL.createObjectURL(f)}
                              className="h-8 w-8"
                            />
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
                        const items = event.clipboardData.items;
                        for (const item of items) {
                          if (
                            item.kind === "file" &&
                            item.type.includes("image/")
                          ) {
                            const blob = item.getAsFile();
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
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    onClick={() =>
                      setData((o) => ({ ...o, is_done: !o.is_done }))
                    }
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
                {update.isPending || updateFile.isPending ? (
                  <Spinner />
                ) : (
                  <SendHorizontal />
                )}
              </Button>
            </form>
          </AlertPrimitiveContent>
        </AlertDialogPortal>
      </AlertDialog>
    </>
  );
};

export default UpdateDailyTask;
