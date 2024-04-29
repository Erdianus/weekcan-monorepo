'use client';

import Link from 'next/link';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';

import k from '@repo/api/kit';
import Flashlist from '@repo/ui/components/flashlist';
import Loading from '@repo/ui/components/loading';
import PortalSearch from '@repo/ui/components/portal-search';
import { Button } from '@repo/ui/components/ui/button';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import Spinner from '@repo/ui/components/ui/spinner';
import { H3 } from '@repo/ui/components/ui/typograhpy';

const CreateMember = ({ id }: { id: string }) => {
  const { data: project } = k.project.single.useQuery({ variables: { id } });
  const { data: members } = k.project.member.all_add.useQuery({
    // variables: { skip_project_id: id },
    enabled: !!project,
  });
  return (
    <>
      <PortalSearch />
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
        {members?.data.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between gap-4 border-b border-border p-4"
          >
            <div>
              <div className="">{member.name}</div>
              <div className="text-sm text-muted-foreground">{member.role_name}</div>
            </div>
            <div className="flex items-center gap-4"></div>
          </div>
        ))}
      </Flashlist>
    </>
  );
};

export default CreateMember;
