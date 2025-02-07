"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, Trash } from "lucide-react";
import { toast } from "sonner";

import { k } from "@hktekno/api";
import ImageUpload, {
  ImageUploadType,
} from "@hktekno/ui/components/image-upload";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { Button } from "@hktekno/ui/components/ui/button";
import { Label } from "@hktekno/ui/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@hktekno/ui/components/ui/radio-group";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import { dateRange } from "@hktekno/ui/lib/date";

const statuses = [
  "No Progress",
  "Koordinasi",
  "Konfirmasi",
  "Loading",
  "Done",
  "Canceled",
];

export default function Detail({ id }: { id: string }) {
  const [imgs] = useState<ImageUploadType>([]);
  const { data: detail } = k.job.single.useQuery({ variables: { id } });
  const [status, setStatus] = useState("");

  const client = useQueryClient();
  const update = k.job.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.job.single.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });

  // pic
  const { data: pics } = k.job.picture.list.useQuery({
    variables: { slug: detail?.data.slug ?? "" },
    enabled: !!detail,
  });
  const uploadPic = k.job.picture.upload.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.job.picture.list.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });

  const delPic = k.job.picture.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.job.picture.list.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });

  if (!detail) return <Spinner />;

  return (
    <>
      <div className="mb-4">
        <H3>{detail.data.name}</H3>
        <div className="my-2 text-muted-foreground">
          {detail.data.pic} • {dateRange(detail.data.time)}
        </div>
        <Badge variant={detail.data.status}>{detail.data.status}</Badge>
      </div>
      <div className="mb-2 flex flex-wrap items-center gap-4">
        <div className="rounded-lg p-4 shadow-lg dark:border">
          <p className="text-xl text-muted-foreground">Kuantitas</p>
          <p className="font-bold">
            {detail.data.qty} {detail.data.unit_of_qty}
          </p>
        </div>
        <div className="rounded-lg p-4 shadow-lg dark:border">
          <p className="text-xl text-muted-foreground">Frekuensi</p>
          <p className="font-bold">
            {detail.data.frq} {detail.data.frq_of_use}
          </p>
        </div>
      </div>
      <div className="mb-8">
        <p className="mb-4 text-lg font-bold">Ganti Status</p>
        <RadioGroup
          defaultValue={detail.data.status}
          className="mb-4 flex w-1/3 flex-wrap items-center gap-4"
          onValueChange={(v) => {
            setStatus(v);
          }}
        >
          {statuses.map((s) => (
            <div key={`ss-${s}`} className="flex items-center space-x-2">
              <RadioGroupItem value={s} id={s} />
              <Label htmlFor={s}>{s}</Label>
            </div>
          ))}
        </RadioGroup>
        <Button
          disabled={status === "" || status === detail.data.status}
          type="button"
          onClick={() => {
            if (status !== "" || status === detail.data.status) {
              update.mutate({
                id,
                data: {
                  status,
                },
              });
            }
          }}
        >
          Ubah Status
        </Button>
      </div>
      <div className="">
        <div className="mb-4 flex items-center gap-2">
          <p className="text-lg font-bold">Gambar</p>
          {(delPic.isPending || uploadPic.isPending) && <Spinner />}
        </div>

        <div className="grid  grid-cols-1 lg:grid-cols-4">
          {pics?.data.map((pic) => (
            <div className="group relative h-max w-max rounded-lg" key={pic.id}>
              <div className="absolute left-0 top-0 hidden h-full w-full flex-col justify-between bg-black/50 group-hover:flex">
                <a href={pic.image_url} target="_blank">
                  <Eye />
                </a>
                <Button
                  disabled={delPic.isPending}
                  variant={"ghost"}
                  className="w-min place-self-end"
                  onClick={() => {
                    delPic.mutate({
                      id: `${pic.id}`,
                    });
                  }}
                >
                  {delPic.isPending ? (
                    <Spinner />
                  ) : (
                    <Trash className="text-destructive-foreground" />
                  )}
                </Button>
              </div>
              <img
                className="h-40 w-40 rounded-lg object-cover"
                src={pic.image_url}
              />
            </div>
          ))}
          <ImageUpload
            value={imgs}
            onChange={(e) => {
              // setImgs(e);
              const picture = e.map((ee) => ee.file).filter((e) => !!e);
              if (picture.length > 0) {
                uploadPic.mutate({
                  slug: detail.data.slug,
                  data: {
                    picture,
                  },
                });
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
