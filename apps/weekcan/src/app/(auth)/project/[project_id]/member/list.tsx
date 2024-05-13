"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Info, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import Loading from "@hktekno/ui/components/loading";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { Button } from "@hktekno/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@hktekno/ui/components/ui/popover";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import Spinner from "@hktekno/ui/components/ui/spinner";
import useAlertStore from "@hktekno/ui/lib/store/useAlertStore";

const ListMemberProject = ({ id }: { id: string }) => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const alert = useAlertStore();

  const client = useQueryClient();
  const { data: project } = k.project.single.useQuery({ variables: { id } });
  const { data: members } = k.project.member.all.useQuery({
    variables: {
      project_id: id,
      params,
    },
  });

  // --NOTE: Update Mutation
  const update = k.project.member.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.project.member.all.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  //--NOTE: Delete Mutation
  const del = k.project.member.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.project.member.all.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <PortalSearch
        className="Cari Data Kustom Proyek..."
        disabled={!members}
      />
      <div className="mb-4 flex items-center justify-between gap-4">
        <Button asChild size={"icon"}>
          <Link href={"member/add"}>
            <Plus />
          </Link>
        </Button>
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
        isloading={!members}
        loading={
          <Loading>
            <div className="flex items-center justify-between gap-4 border-b border-border p-4">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </Loading>
        }
        isfallback={members?.data.length === 0}
        fallback={<div>Tidak Ada Data Kustom</div>}
      >
        {members?.data.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between gap-4 border-b border-border p-4"
          >
            <div>
              <div className="">{member.name}</div>
              <div className="text-sm text-muted-foreground">
                {member.role_member.role}
              </div>
            </div>
            {!(
              `${project?.data.pic}` === `${member.id}` ||
              `${member.role_name}` === "Owner"
            ) && (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant={"ghost"} size={"icon"} type="button">
                      {update.isPending &&
                      update.variables.data.user_id == member.id ? (
                        <Spinner />
                      ) : (
                        <Pencil size={20} />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                      value={member.role_member.role}
                      onValueChange={(role) => {
                        if (role === member.role_member.role) return;
                        update.mutate({
                          data: {
                            project_id: id,
                            role,
                            user_id: member.id,
                          },
                        });
                      }}
                    >
                      <DropdownMenuRadioItem value="Admin">
                        Admin
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Member">
                        Member
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  type="button"
                  onClick={() => {
                    alert.setData({
                      open: true,
                      header: `Yakin ingin menghapus '${member.name}'?`,
                      desc: "Member yang sudah dihapus tidak dapat dikembalikan lagi dan harus ditambahkan manual lagi",
                      confirmText: "Ya, Hapus",
                      onConfirm: () => {
                        del.mutate({
                          user_id: `${member.id}`,
                          project_id: id,
                        });
                      },
                    });
                  }}
                >
                  {del.isPending && del.variables.user_id === `${member.id}` ? (
                    <Spinner />
                  ) : (
                    <Trash2 size={20} />
                  )}
                </Button>
              </div>
            )}
          </div>
        ))}
      </Flashlist>
    </>
  );
};

export default ListMemberProject;
