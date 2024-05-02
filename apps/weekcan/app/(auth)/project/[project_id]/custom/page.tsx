import { Metadata } from 'next';

import k, { dehydrate, HydrationBoundary, inferVariables, QueryClient } from '@repo/api/kit';

import ListCustomProject from './list';

export const metadata: Metadata = {
  title: 'Kustom Data',
};

export default async function CustomProjectPage({
  params,
  searchParams,
}: {
  params: { project_id: string | number };
  searchParams: inferVariables<typeof k.project.detail.all>;
}) {
  const client = new QueryClient();

  await client.prefetchQuery(
    k.project.detail.all.getFetchOptions({ ...searchParams, project_id: params.project_id }),
  );

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <ListCustomProject id={params.project_id} />
    </HydrationBoundary>
  );
}
