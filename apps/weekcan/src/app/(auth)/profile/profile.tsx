"use client";

import type { z } from "zod";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { k } from "@hktekno/api";
import { userUpdateFormSchema } from "@hktekno/api/routers/user/schema";
import { CropImage, getImgFile } from "@hktekno/ui/components/crop-image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { Button } from "@hktekno/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@hktekno/ui/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@hktekno/ui/components/ui/form";
import { Input } from "@hktekno/ui/components/ui/input";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { useImageCropStore } from "@hktekno/ui/lib/store/useImageCropStore";
import { shortName } from "@hktekno/ui/lib/utils";

const userUpdateForm = userUpdateFormSchema.omit({
  role_id: true,
  role: true,
  company: true,
  company_id: true,
});

const Profile = ({ id }: { id: string }) => {
  const imgCrop = useImageCropStore();

  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { data: user } = k.user.single.useQuery({ variables: { id } });

  const form = useForm<z.infer<typeof userUpdateForm>>({
    resolver: zodResolver(userUpdateForm),
    values: {
      name: user?.data.name ?? "",
      username: user?.data.username ?? "",
      email: user?.data.email ?? "",
    },
  });

  const client = useQueryClient();
  const updateImg = k.user.update_picture.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      setOpen(false);
      await client.invalidateQueries({
        queryKey: k.user.single.getKey({ id }),
      });
    },
    onError: ({ message }) => toast.error(message),
  });
  const update = k.user.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.user.single.getKey({ id }),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ganti Foto Profil</DialogTitle>
          </DialogHeader>
          <CropImage />
          <Button
            type="button"
            onClick={async () => {
              const picture_path = await getImgFile(imgCrop);
              updateImg.mutate({ id, picture_path });
            }}
          >
            {updateImg.isPending ? <Spinner /> : "Upload"}
          </Button>
        </DialogContent>
      </Dialog>
      <Avatar className="group relative mb-4 h-20 w-20">
        <AvatarImage src={user?.data.picture_link} />
        <AvatarFallback>{shortName(user?.data.name)}</AvatarFallback>
        <label
          htmlFor="img"
          className="absolute flex h-20 w-20 flex-col items-center justify-center bg-gray-900/60 text-xs opacity-0 transition group-hover:opacity-90"
        >
          <Camera size={16} />
          <div>Ganti Foto</div>
        </label>
        <input
          ref={fileRef}
          id="img"
          hidden
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setOpen(true);
              imgCrop.setCrop(undefined); // Makes crop preview update between images.
              const reader = new FileReader();
              reader.addEventListener("load", () =>
                imgCrop.setImgSrc(reader.result?.toString() ?? ""),
              );
              // @ts-expect-error gapapa error gan
              reader.readAsDataURL(e.target.files[0]);
            }
          }}
        />
      </Avatar>
      {fileRef.current?.files?.[0]?.name}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((v) => {
            update.mutate({
              id,
              data: { ...v, role_id: user?.data.role_id ?? "" },
            });
          })}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Nama Lengkap" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Nama Pengguna" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button>{update.isPending ? <Spinner /> : "Update Profile"} </Button>
        </form>
      </Form>
    </>
  );
};

export default Profile;
