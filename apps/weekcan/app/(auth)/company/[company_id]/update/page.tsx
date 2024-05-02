import { Metadata } from 'next';

import k, { dehydrate, HydrationBoundary, QueryClient } from '@repo/api/kit';

import UpdateCompany from './update';

export const metadata: Metadata = {
  title: 'Update Perusahaan',
};

export default async function CompanyPage({ params }: { params: { company_id: string | number } }) {
  const client = new QueryClient();

  await client.prefetchQuery(k.company.single.getFetchOptions({ id: params.company_id }));

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <UpdateCompany id={params.company_id} />
    </HydrationBoundary>
  );
}
