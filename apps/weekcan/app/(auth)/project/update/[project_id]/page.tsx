import { Metadata } from 'next';

import k, { dehydrate, HydrationBoundary, QueryClient } from '@repo/api/kit';

import UpdateProject from './update';

export const metadata: Metadata = {
  title: 'Update Proyek',
};

export default async function UpdateProjectPage({
  params,
}: {
  params: { project_id: string | number };
}) {
  const client = new QueryClient();

  await client.prefetchQuery(k.project.single.getFetchOptions({ id: params.project_id }));
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <UpdateProject id={params.project_id} />
    </HydrationBoundary>
  );
}
