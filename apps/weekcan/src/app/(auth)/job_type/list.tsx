"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Pencil, Plus, Trash2, X, Zap } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import Loading from "@hktekno/ui/components/loading";
import Paginate from "@hktekno/ui/components/paginate";
import PaginationParams from "@hktekno/ui/components/pagination-params";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { SelectAsync } from "@hktekno/ui/components/select";
import { Button } from "@hktekno/ui/components/ui/button";
import { Input } from "@hktekno/ui/components/ui/input";
import { Label } from "@hktekno/ui/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@hktekno/ui/components/ui/popover";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import { loadCompanyOptions } from "@hktekno/ui/lib/select";
import useAlertStore from "@hktekno/ui/lib/store/useAlertStore";

const jobTypeForm = z.object({
  company: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { invalid_type_error: "Tolong Pilih Perusahaan" },
  ),
  job_name: z.string().min(1, "Tolong Isi Nama Job Type"),
});

const EditJobType = (props: {
  data: z.infer<typeof jobTypeForm> & { id: string | number };
  onClose: () => void;
}) => {
  const [data, setData] = useState<z.infer<typeof jobTypeForm>>(props.data);

  const client = useQueryClient();
  const update = k.jobType.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      props.onClose();
      await client.invalidateQueries({ queryKey: k.jobType.all.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });
  return (
    <>
      <div>
        <SelectAsync
          loadOptions={loadCompanyOptions}
          value={data.company}
          onChange={(company) => {
            // @ts-expect-error gapapa error gan
            setData((o) => ({ ...o, company }));
          }}
        />
        <Input
          value={data.job_name}
          onChange={(e) => setData((o) => ({ ...o, job_name: e.target.value }))}
        />
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
        <Button
          variant={"ghost"}
          size={"icon"}
          type="button"
          onClick={() => {
            update.mutate({
              id: `${props.data.id}`,
              data: {
                job_name: data.job_name,
                company_id: data.company.value,
              },
            });
          }}
        >
          {update.isPending && update.variables.id === `${props.data.id}` ? (
            <Spinner />
          ) : (
            <Check />
          )}
        </Button>
      </div>
    </>
  );
};

const ListJobTypes = () => {
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const alert = useAlertStore();
  const [editID, setEditID] = useState(0);

  const form = useForm<z.infer<typeof jobTypeForm>>({
    resolver: zodResolver(jobTypeForm),
    values: {
      // @ts-expect-error gapapa error gan
      company: null,
      job_name: "",
    },
  });

  const { data: jobTypes } = k.jobType.all.useQuery({ variables });

  const client = useQueryClient();
  //--NOTE: Create Mutation
  const create = k.jobType.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      form.reset();
      await client.invalidateQueries({
        queryKey: k.jobType.all.getKey(variables),
      });
    },
    onError: ({ message }) => toast.error(message),
  });
  //--NOTE: Delete Mutation
  const del = k.jobType.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.jobType.all.getKey(variables),
      });
    },
    onError: ({ message }) => toast.error(message),
  });
  return (
    <>
      <PortalSearch placeholder="Cari Jabatan..." />
      <div className="flex items-center justify-between">
        <H3 className="mb-4">Jabatan</H3>
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
                <h4 className="font-medium leading-none">Tambah Jabatan</h4>
              </div>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit((data) => {
                  create.mutate({
                    data: {
                      company_id: data.company.value,
                      job_name: data.job_name,
                    },
                  });
                })}
              >
                <div>
                  <Label className="mb-2">Nama Jabatan</Label>
                  <Input
                    {...form.register("job_name")}
                    placeholder="Contoh: Graphic Desainer"
                  />
                </div>
                <Controller
                  control={form.control}
                  name="company"
                  render={({ field }) => {
                    return (
                      <div>
                        <Label className="mb-1">Perusahaan</Label>
                        <SelectAsync
                          menuPortalTarget={
                            typeof window !== "undefined" ? document.body : null
                          }
                          loadOptions={loadCompanyOptions}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Pilih Perusahaan"
                        />
                      </div>
                    );
                  }}
                />
                <Button type="submit" disabled={create.isPending}>
                  {create.isPending ? <Spinner /> : "Submit"}
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Flashlist
        isloading={!jobTypes}
        loading={
          <Loading>
            <div className="flex items-center justify-between gap-4 border-b border-border p-4">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </Loading>
        }
        isfallback={jobTypes?.data.length === 0}
        fallback={<div>Tidak Ada Jabatan</div>}
      >
        {jobTypes?.data.map((job) => (
          <div
            key={`job-${job.id}`}
            className="flex items-center justify-between gap-4 border-b border-border p-4"
          >
            {editID !== job.id && (
              <>
                <div>{job.job_name}</div>
                <div className="flex items-center gap-4">
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    type="button"
                    onClick={() => setEditID(job.id)}
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
                        header: `Yakin ingin menghapus '${job.job_name}'?`,
                        desc: "Jabatan yang sudah dihapus tidak dapat dikembalikan lagi.",
                        confirmText: "Ya, Hapus",
                        onConfirm: () => {
                          del.mutate({ id: `${job.id}` });
                        },
                      });
                    }}
                  >
                    {del.isPending && del.variables.id === `${job.id}` ? (
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
      <div className="mt-4 flex w-full items-center justify-end gap-4">
        <Paginate />
        <PaginationParams meta={jobTypes?.meta} />
      </div>
    </>
  );
};

export default ListJobTypes;
