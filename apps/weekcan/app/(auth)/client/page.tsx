import { Metadata } from 'next';

import k, { dehydrate, HydrationBoundary, inferVariables, QueryClient } from '@repo/api/kit';

import ListClient from './list';

export const metadata: Metadata = {
  title: 'Klien',
};

export default async function VenuePage({
  searchParams,
}: {
  searchParams: inferVariables<typeof k.client.all>;
}) {
  const client = new QueryClient();

  await client.prefetchQuery(k.client.all.getFetchOptions(searchParams));

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <ListClient />
    </HydrationBoundary>
  );
}
