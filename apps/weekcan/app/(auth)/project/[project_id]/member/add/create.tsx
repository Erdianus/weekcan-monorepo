'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Pencil, Plus, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import k, { inferData, useQueryClient } from '@repo/api/kit';
import Flashlist from '@repo/ui/components/flashlist';
import Loading from '@repo/ui/components/loading';
import PortalSearch from '@repo/ui/components/portal-search';
import { Button } from '@repo/ui/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import Spinner from '@repo/ui/components/ui/spinner';
import { H3 } from '@repo/ui/components/ui/typograhpy';

const memberFormSchema = z.object({
  project_id: z.string(),
  user: z.record(z.number(), z.string()),
});

const Member = ({
  member,
}: {
  member: inferData<typeof k.project.member.all_add>['data'][number];
}) => {
  const params = useParams<{ project_id: string }>();
  const [role, setRole] = useState<string>('');

  const client = useQueryClient();
  const create = k.project.member.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.project.member.all.getKey() });
      await client.invalidateQueries({ queryKey: k.project.member.all_add.getKey() });
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
            <SelectItem value="Leader">Leader</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Member">Member</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant={role ? 'outline' : 'ghost'}
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
  const { data: members } = k.project.member.all_add.useQuery({
    variables: { skip_project: id, search: searchParams.get('search') },
  });

  const form = useForm<z.infer<typeof memberFormSchema>>({
    resolver: zodResolver(memberFormSchema),
  });

  return (
    <>
      <PortalSearch placeholder="Cari Anggota..." />
      <div className="mb-4 flex items-center gap-4">
        <Button asChild variant={'ghost'} size={'icon'}>
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
        fallback={<div>Tidak Ada Data Kustom</div>}
      >
        {members?.data.map((member) => <Member member={member} />)}
      </Flashlist>
    </>
  );
};

export default CreateMember;
