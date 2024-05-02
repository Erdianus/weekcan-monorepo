import { Metadata } from 'next';

import k, { dehydrate, HydrationBoundary, inferVariables, QueryClient } from '@repo/api/kit';

import ListCompany from './list';

export const metadata: Metadata = {
  title: 'Perusahaan',
};

export default async function CompanyPage({
  searchParams,
}: {
  searchParams: inferVariables<typeof k.company.all>;
}) {
  const client = new QueryClient();

  await client.prefetchQuery(k.company.all.getFetchOptions(searchParams));

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <ListCompany />
    </HydrationBoundary>
  );
}
