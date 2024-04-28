import { Metadata } from "next";
import k, { HydrationBoundary, QueryClient, dehydrate } from "@repo/api/kit";
import ListFileProject from "./list";

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
    k.project.file.all.getFetchOptions({ project_id: params.project_id }),
  );

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <ListFileProject id={params.project_id} />
    </HydrationBoundary>
  );
}
