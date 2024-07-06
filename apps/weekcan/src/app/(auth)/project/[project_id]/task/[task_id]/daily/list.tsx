"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Pencil, ThumbsUp, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import { LightBox } from "@hktekno/ui/components/lightbox";
import Loading from "@hktekno/ui/components/loading";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { Button } from "@hktekno/ui/components/ui/button";
import { DateRangePicker } from "@hktekno/ui/components/ui/date-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { date4Y2M2D } from "@hktekno/ui/lib/date";
import useAlertStore from "@hktekno/ui/lib/store/useAlertStore";
import useUserStore from "@hktekno/ui/lib/store/useUserStore";
import { fileExt } from "@hktekno/ui/lib/utils";

import CreateDailyTask from "./create";
import UpdateDailyTask from "./update";

const ListTaskProject = ({ id }: { id: string }) => {
  // Buat Update
  const [edit, setEdit] = useState({ open: false, id: "" });

  const user = useUserStore();
  const alert = useAlertStore();
  const [mount, setMount] = useState(false);
  const [indexLB, setIndexLB] = useState(-1);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const variables = Object.fromEntries(searchParams.entries());

  const client = useQueryClient();
  const { data: task } = k.project.task.single.useQuery({ variables: { id } });

  const {
    data: infiniteDailys,
    hasNextPage,
    fetchNextPage,
  } = k.project.task.daily.dateGroupInfinite.useInfiniteQuery({
    variables: { ...variables, task_project_id: id },
  });

  const del = k.project.task.daily.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      alert.reset();
      await client.invalidateQueries({
        queryKey: k.project.task.daily.dateGroupInfinite.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  const isItHim = task && `${task.data.task_for}` === `${user.id}`;

  let index_for_image = useMemo(() => {
    return -1;
  }, [infiniteDailys]);

  const slides = useMemo(() => {
    let slideList: { src: string; title: string }[] = [];
    if (infiniteDailys) {
      infiniteDailys.pages.forEach((dailys) =>
        Object.keys(dailys.data).forEach((key) => {
          const dailyList = dailys.data[key];

          if (dailyList) {
            const dailyWithFile = dailyList.filter((daily) => {
              return daily.file.filter((f) => {
                const extension = fileExt(f.file_link ?? "").toLowerCase();

                return (
                  extension === "png" ||
                  extension === "jpg" ||
                  extension === "jpeg"
                );
              });
            });

            dailyWithFile.forEach((daily) => {
              daily.file.forEach((f) => {
                slideList.push({
                  src: f.file_link,
                  title: daily.desc_detail_task,
                });
              });
            });
          }
        }),
      );
    }

    return slideList;
  }, [infiniteDailys]);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      <LightBox
        open={indexLB >= 0}
        index={indexLB}
        close={() => setIndexLB(-1)}
        slides={slides}
      />
      <DateRangePicker
        mode="range"
        disabled={!infiniteDailys}
        value={
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
      <div className="relative mt-4 pb-20 md:min-h-svh">
        <Flashlist
          isloading={!infiniteDailys}
          loading={
            <Loading>
              <Skeleton className="mb-2 h-10 w-1/2 rounded-lg" />
            </Loading>
          }
          isfallback={Array.isArray(infiniteDailys?.pages[0]?.data)}
          fallback={<div>Tidak Ada Data Perihal. Coba ubah tanggal </div>}
        >
          {infiniteDailys?.pages.map((dailys) =>
            Object.keys(dailys?.data ?? {}).map((date) => {
              const dailyList = dailys?.data[date];
              return (
                <div key={`date-${date}`} className="mb-4">
                  <div className="sticky top-16 z-10 flex w-full items-center justify-center pb-1 sm:justify-start">
                    <Badge>{dayjs(date).format("DD-MMMM-YYYY")}</Badge>
                  </div>
                  {dailyList?.map((daily, i) => {
                    return (
                      <Fragment key={`daily-${daily.id}`}>
                        {daily.file.map((f) => {
                          const ext = fileExt(f.label ?? "").toLowerCase();
                          const isImage =
                            ext === "png" || ext === "jpg" || ext === "jpeg";

                          if (isImage) index_for_image++;
                          if (!isImage) return null;

                          return (
                            <button
                              type="button"
                              data-index={index_for_image}
                              className="relative mb-2 block w-auto flex-1 rounded-lg bg-main-500 p-1 dark:bg-main-900 sm:max-w-sm sm:flex-none"
                            >
                              <img
                                data-index={index_for_image}
                                onClick={(e) => {
                                  if (e.currentTarget.dataset.index)
                                    setIndexLB(
                                      Number(e.currentTarget.dataset.index),
                                    );
                                }}
                                className="rounded-lg"
                                src={f.file_link}
                              />
                              {isItHim &&
                                dailyList[i + 1]?.desc_detail_task ===
                                  daily.desc_detail_task && (
                                  <Button
                                    type="button"
                                    className="absolute right-1 top-1 z-10"
                                    onClick={() => {
                                      alert.setData({
                                        header:
                                          "Yakin ingin menghapus gambar ini?",
                                        confirmText: "Ya, Hapus",
                                        open: true,
                                        onConfirm: () => {
                                          del.mutate({ id: `${daily.id}` });
                                        },
                                      });
                                    }}
                                    variant={"secondary"}
                                    size={"icon"}
                                  >
                                    {del.isPending &&
                                    del.variables.id === `${daily.id}` ? (
                                      <Spinner />
                                    ) : (
                                      <Trash2 />
                                    )}
                                  </Button>
                                )}
                            </button>
                          );
                        })}
                        <div className="group mb-2 flex items-center gap-1 sm:w-1/2">
                          <div className="relative flex flex-1 items-center rounded-lg bg-main-500 p-2 pr-11 text-white dark:bg-main-900 dark:text-main-400 ">
                            <div className="absolute bottom-1 right-1 flex items-center gap-1 text-xs">
                              <div className="h-3 w-3">
                                {daily.is_done && <ThumbsUp size={12} />}
                              </div>
                              <div>
                                {dayjs(daily.created_at).format("HH:mm")}
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger disabled={!isItHim} asChild>
                                <div className="cursor-pointer underline">
                                  {daily.desc_detail_task}
                                </div>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setEdit({ open: true, id: `${daily.id}` })
                                  }
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    alert.setData({
                                      open: true,
                                      confirmText: "Ya, Hapus",
                                      header: `Yakin ingin mengapus Perihal?`,
                                      desc: "Perihal yang dihapus tidak dapat dikembalikan lagi",
                                      onConfirm: () => {
                                        del.mutate({ id: `${daily.id}` });
                                      },
                                    })
                                  }
                                  className="hover:bg-red-500 dark:hover:bg-red-900 dark:hover:text-red-50"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Hapus</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              );
            }),
          )}
          {hasNextPage && (
            <Button type="button" onClick={() => fetchNextPage()}>
              Tampilkan Lebih
            </Button>
          )}
        </Flashlist>
      </div>
      <UpdateDailyTask
        open={edit.open}
        id={edit.id}
        onClose={() => setEdit({ open: false, id: "" })}
      />
      {mount &&
        isItHim &&
        createPortal(
          <CreateDailyTask />,
          // @ts-expect-error gapapa error gan
          document.querySelector("main"),
        )}
    </>
  );
};

export default ListTaskProject;
