import { Metadata } from 'next';

import k, { dehydrate, HydrationBoundary, QueryClient } from '@repo/api/kit';

import UpdateUser from './update';

export const metadata: Metadata = {
  title: 'Update User',
};

export default async function UpdateUserPage({ params }: { params: { user_id: string | number } }) {
  const client = new QueryClient();

  await client.prefetchQuery(k.user.single.getFetchOptions({ id: params.user_id }));

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <UpdateUser id={params.user_id} />
    </HydrationBoundary>
  );
}
