"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "sonner";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import Loading from "@hktekno/ui/components/loading";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { Button } from "@hktekno/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@hktekno/ui/components/ui/select";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";

const Member = ({
  member,
}: {
  member: inferData<typeof k.project.member.notInProject>["data"][number];
}) => {
  const params = useParams<{ project_id: string }>();
  const [role, setRole] = useState<string>("");

  const client = useQueryClient();
  const create = k.project.member.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.project.member.all.getKey(),
      });
      await client.invalidateQueries({
        queryKey: k.project.member.notInProject.getKey(),
      });
    },
  });

  return (
    <div
      key={member.id}
      className="flex items-center justify-between gap-4 border-b border-border p-4"
    >
      <div>
        <div className="">{member.name}</div>
      </div>
      <div className="flex items-center gap-4">
        <Select onValueChange={(e) => setRole(e)}>
          <SelectTrigger className="">
            <SelectValue placeholder="Pilih Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Member">Member</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant={role ? "outline" : "ghost"}
          disabled={!role}
          onClick={() => {
            create.mutate({
              data: {
                project_id: params.project_id,
                role: [role],
                users_id: [member.id],
              },
            });
          }}
        >
          {create.isPending ? <Spinner /> : <Plus />}
        </Button>
      </div>
    </div>
  );
};

const CreateMember = ({ id }: { id: string }) => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const { data: members } = k.project.member.notInProject.useQuery({
    variables: { project_id: id, params },
  });

  return (
    <>
      <PortalSearch placeholder="Cari Anggota..." />
      <div className="mb-4 flex items-center gap-4">
        <Button asChild variant={"ghost"} size={"icon"}>
          <Link href={`/project/${id}/member`} replace>
            <ArrowLeft />
          </Link>
        </Button>
        <H3>Tambah Anggota</H3>
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
        fallback={<div>Tidak Ada Karyawan yang bisa ditambahkan lagi</div>}
      >
        {members?.data.map((member) => <Member member={member} />)}
      </Flashlist>
    </>
  );
};

export default CreateMember;
