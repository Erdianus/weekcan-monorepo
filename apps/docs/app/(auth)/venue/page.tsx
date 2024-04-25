import k, { HydrationBoundary, QueryClient, dehydrate } from "@repo/api/kit";
import ListVenue from "@repo/ui/pages/venue/list";

export default async function VenuePage() {
  const client = new QueryClient();

  await client.prefetchQuery(k.venue.all.getFetchOptions());

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <ListVenue />
    </HydrationBoundary>
  );
}
