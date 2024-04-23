import k, { HydrationBoundary, QueryClient, dehydrate } from "@repo/api/kit";
import ListUser from '@repo/ui/pages/user/list';

export default async function UserPage() {
  const client = new QueryClient();

  await client.prefetchQuery(k.user.all.getFetchOptions())

  return <HydrationBoundary state={dehydrate(client)}>
    <ListUser />
  </HydrationBoundary>
}
