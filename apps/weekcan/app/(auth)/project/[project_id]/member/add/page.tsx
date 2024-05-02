import { Metadata } from 'next';

import k, { HydrationBoundary, QueryClient } from '@repo/api/kit';

import CreateMember from './create';

export const metadata: Metadata = {
  title: 'Tambah Anggota',
};

export default async function CreateMemberPage({ params }: { params: { project_id: string } }) {
  const client = new QueryClient();

  await client.prefetchQuery(
    // @ts-ignore
    k.project.member.all_add.getFetchOptions({ skip_project_id: params.project_id }),
  );
  return (
    <HydrationBoundary>
      <CreateMember id={params.project_id} />
    </HydrationBoundary>
  );
}
