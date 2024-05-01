import { Metadata } from 'next';

import k, { dehydrate, HydrationBoundary, inferVariables, QueryClient } from '@repo/api/kit';
import { auth } from '@repo/auth';
import ListCompany from '@repo/ui/pages/company/list';

export const metadata: Metadata = {
  title: 'Perusahaan',
};

export default async function CompanyPage({
  searchParams,
}: {
  searchParams: inferVariables<typeof k.company.all>;
}) {
  console.log('aku dari company page');
  const client = new QueryClient();

  await client.prefetchQuery(k.company.all.getFetchOptions(searchParams));

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <ListCompany />
    </HydrationBoundary>
  );
}
