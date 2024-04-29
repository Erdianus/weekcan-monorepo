import { Metadata } from 'next';

import k, { dehydrate, HydrationBoundary, QueryClient } from '@repo/api/kit';

import ListSprint from './list';

export const metadata: Metadata = {
  title: 'Jadwal Proyek',
};

export default async function SprintProjectPage({
  searchParams,
  params,
}: {
  searchParams: { search?: string; page?: number; paginate?: number };
  params: { project_id: string };
}) {
  const client = new QueryClient();

  await client.prefetchQuery(k.project.sprint.all.getFetchOptions({ ...searchParams, ...params }));

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <ListSprint project_id={params.project_id} />
    </HydrationBoundary>
  );
}
