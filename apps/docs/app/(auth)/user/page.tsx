import k, {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  inferVariables,
} from "@repo/api/kit";
import ListUser from "@repo/ui/pages/user/list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User",
};

export default async function UserPage({
  searchParams,
}: {
  searchParams: inferVariables<typeof k.user.all>;
}) {
  const client = new QueryClient();

  await client.prefetchQuery(
    k.user.all.getFetchOptions({ search: searchParams?.search }),
  );

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <ListUser />
    </HydrationBoundary>
  );
}
