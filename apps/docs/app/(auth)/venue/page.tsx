import k, {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  inferVariables,
} from "@repo/api/kit";
import ListVenue from "@repo/ui/pages/venue/list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klien",
};

export default async function VenuePage({
  searchParams,
}: {
  searchParams: inferVariables<typeof k.venue.all>;
}) {
  const client = new QueryClient();

  await client.prefetchQuery(k.venue.all.getFetchOptions(searchParams));

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <ListVenue />
    </HydrationBoundary>
  );
}
