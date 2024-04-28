import { Metadata } from "next";
import ListCustomProject from "./list";
import k, { HydrationBoundary, QueryClient, dehydrate } from "@repo/api/kit";

export const metadata: Metadata = {
  title: "Kustom Data",
};

export default async function CustomProjectPage({
  params,
}: {
  params: { project_id: string | number };
}) {
  const client = new QueryClient();

  await client.prefetchQuery(
    k.project.detail.all.getFetchOptions({ project_id: params.project_id }),
  );

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <ListCustomProject id={params.project_id} />
    </HydrationBoundary>
  );
}
