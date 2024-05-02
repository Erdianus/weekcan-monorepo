import { Suspense, type ReactNode } from 'react';

import k, { dehydrate, HydrationBoundary, QueryClient } from '@repo/api/kit';

import SingleProject from './single';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { project_id: string | number };
}) {
  const client = new QueryClient();

  await client.prefetchQuery(k.project.single.getFetchOptions({ id: params.project_id }));

  return (
    <>
      <HydrationBoundary state={dehydrate(client)}>
        <Suspense fallback={<div>Loading Single...</div>}>
        <SingleProject id={params.project_id} />
        </Suspense>
        {children}
      </HydrationBoundary>
    </>
  );
}
