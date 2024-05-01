import { Metadata } from 'next';

import k, { dehydrate, HydrationBoundary, inferVariables, QueryClient } from '@repo/api/kit';

import ListProject from './list';

export const metadata: Metadata = {
  title: 'Proyek/Event',
};

export default async function ProjectPage({
  searchParams,
}: {
  searchParams: inferVariables<typeof k.project.all>;
}) {
  const client = new QueryClient();

  await client.prefetchQuery(k.project.all.getFetchOptions(searchParams));
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <ListProject />
    </HydrationBoundary>
  );
}
