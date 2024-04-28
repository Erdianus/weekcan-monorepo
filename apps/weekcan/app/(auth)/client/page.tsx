import k, {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  inferVariables,
} from "@repo/api/kit";
import ListClient from "@repo/ui/pages/client/list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Klien'
}

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
