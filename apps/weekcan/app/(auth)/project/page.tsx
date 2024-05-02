import { Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import k, { dehydrate, HydrationBoundary, inferVariables, QueryClient } from '@repo/api/kit';
import { Button } from '@repo/ui/components/ui/button';
import { H3 } from '@repo/ui/components/ui/typograhpy';

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
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">Proyek</H3>
        <Button type="button" size={'icon'} asChild>
          <Link href={'project/create'}>
            <Plus />
          </Link>
        </Button>
      </div>
      <HydrationBoundary state={dehydrate(client)}>
        <ListProject />
      </HydrationBoundary>
    </>
  );
}
