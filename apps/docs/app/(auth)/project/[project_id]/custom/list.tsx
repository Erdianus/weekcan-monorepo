"use client";
import k, { useQueryClient } from "@repo/api/kit";
import { detailFormSchema } from "@repo/api/router/project/detail/schema";
import Flashlist from "@repo/ui/components/flashlist";
import Loading from "@repo/ui/components/loading";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import Spinner from "@repo/ui/components/ui/spinner";
import useAlertStore from "@repo/ui/lib/store/useAlertStore";
import { Check, Info, Pencil, Plus, Trash2, X, Zap } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@repo/ui/components/ui/label";
import { z } from "zod";

const EditCustom = (props: {
  data: { title: string; desc: string; id: number };
  onClose: () => void;
}) => {
  const params = useParams<{ project_id: string }>();

  const form = useForm<z.infer<typeof detailFormSchema>>({
    resolver: zodResolver(detailFormSchema),
    values: {
      title: props.data.title,
      desc: props.data.desc,
      project_id: params.project_id,
    },
  });

  const client = useQueryClient();
  const update = k.project.detail.update.useMutation({
    onSuccess: async ({ message }) => {
      await client.invalidateQueries({
        queryKey: k.project.detail.all.getKey(),
      });
      toast.success(message);
      props.onClose();
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <form
      className="flex items-center justify-between w-full"
      onSubmit={form.handleSubmit((data) => {
        update.mutate({
          id: props.data.id,
          data,
        });
      })}
    >
      <div className="space-y-1">
        <div>
          <Label className="mb-1.5">Judul</Label>
          <Input {...form.register("title")} />
        </div>
        <div>
          <Label className="mb-1.5">Deskripsi</Label>
          <Input {...form.register("desc")} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant={"ghost"}
          size={"icon"}
          type="button"
          onClick={props.onClose}
        >
          <X size={20} />
        </Button>
        <Button variant={"ghost"} size={"icon"} type="submit">
          {update.isPending ? (
            <Spinner />
          ) : (
            <Check />
          )}
        </Button>
      </div>
    </form>
  );
};

const ListCustomProject = ({ id }: { id: string | number }) => {
  const searchParams = useSearchParams();
  const alert = useAlertStore();
  const [editID, setEditID] = useState(0);

  const form = useForm<z.infer<typeof detailFormSchema>>({
    resolver: zodResolver(detailFormSchema),
    values: {
      title: "",
      desc: "",
      project_id: `${id}`,
    },
  });

  const client = useQueryClient();
  const { data: customs } = k.project.detail.all.useQuery({
    variables: { project_id: id },
  });

  //--NOTE: Create Mutation
  const create = k.project.detail.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      form.reset();
      await client.invalidateQueries({
        queryKey: k.project.detail.all.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  //--NOTE: Delete Mutation
  const del = k.project.detail.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.project.detail.all.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Popover>
          <PopoverTrigger asChild className="relative">
            <Button className="relative" size={"icon"}>
              <Plus />
              <Zap className="absolute bottom-1 right-1" size={12} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">
                  Tambah Tempat Acara
                </h4>
              </div>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit((data) => {
                  create.mutate({ data: [data] });
                })}
              >
                <div>
                  <Label className="mb-1">Nama</Label>
                  <Input
                    {...form.register("title")}
                    placeholder="Contoh: Convention Hall"
                  />
                </div>
                <div>
                  <Label className="mb-1">Deskripsi</Label>
                  <Input
                    {...form.register("desc")}
                    placeholder="Contoh: Convention Hall"
                  />
                </div>
                <Button type="submit" disabled={create.isPending}>
                  {create.isPending ? <Spinner /> : "Submit"}
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Info size={16} />
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Ini adalah halaman untuk menambahkan data tambahan pada proyek
                  yang tidak ada dalam saat kalian membuat sebuah proyek
                </p>
                <p className="text-sm text-muted-foreground">Contoh</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Flashlist
        isloading={!customs}
        loading={
          <Loading>
            <div className="border-border flex items-center justify-between p-4 border-b gap-4">
              <Skeleton className="w-1/4 h-8" />
              <Skeleton className="rounded-md h-8 w-8" />
            </div>
          </Loading>
        }
        isfallback={customs?.data.length === 0}
        fallback={<div>Tidak Ada Data Kustom</div>}
      >
        {customs?.data.map((custom) => (
          <div className="border-border flex items-center justify-between p-4 border-b gap-4">
            {editID === custom.id && (
              <EditCustom
                data={custom}
                onClose={() => {
                  setEditID(0);
                }}
              />
            )}
            {editID !== custom.id && (
              <>
                <div>{custom.title}</div>
                <div className="flex items-center gap-4">
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    type="button"
                    onClick={() => setEditID(custom.id)}
                  >
                    <Pencil size={20} />
                  </Button>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    type="button"
                    onClick={() => {
                      alert.setData({
                        open: true,
                        header: `Yakin ingin menghapus '${custom.title}'?`,
                        desc: "Data Kustom yang sudah dihapus tidak dapat dikembalikan lagi.",
                        confirmText: "Ya, Hapus",
                        onConfirm: () => {
                          del.mutate({ id: `${custom.id}` });
                        },
                      });
                    }}
                  >
                    {del.isPending && del.variables.id === `${custom.id}` ? (
                      <Spinner />
                    ) : (
                      <Trash2 size={20} />
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </Flashlist>
    </>
  );
};

export default ListCustomProject;
