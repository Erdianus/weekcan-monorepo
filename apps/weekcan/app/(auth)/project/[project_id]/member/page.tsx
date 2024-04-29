import { Metadata } from 'next';

import k, { dehydrate, HydrationBoundary, QueryClient } from '@repo/api/kit';

import ListMemberProject from './list';

export const metadata: Metadata = {
  title: 'Member Proyek',
};

export default async function MemberProjectPage({ params }: { params: { project_id: string } }) {
  const client = new QueryClient();

  await client.prefetchQuery(
    k.project.member.all.getFetchOptions({ project_id: params.project_id }),
  );

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <ListMemberProject id={params.project_id} />
    </HydrationBoundary>
  );
}
