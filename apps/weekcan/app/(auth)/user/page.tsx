import { Metadata } from 'next';

import k, { dehydrate, HydrationBoundary, inferVariables, QueryClient } from '@repo/api/kit';

import ListUser from './list';

export const metadata: Metadata = {
  title: 'User',
};

export default async function UserPage({
  searchParams,
}: {
  searchParams: inferVariables<typeof k.user.all>;
}) {
  const client = new QueryClient();

  await client.prefetchQuery(k.user.all.getFetchOptions(searchParams));

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <ListUser />
    </HydrationBoundary>
  );
}
