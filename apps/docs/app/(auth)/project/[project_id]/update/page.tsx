import k, { HydrationBoundary, QueryClient, dehydrate } from "@repo/api/kit";
import UpdateProject from "@repo/ui/pages/project/update";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Proyek",
};

export default async function UpdateProjectPage({
  params,
}: {
  params: { project_id: string | number };
}) {
  const client = new QueryClient();

  await client.prefetchQuery(
    k.project.single.getFetchOptions({ id: params.project_id }),
  );
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <UpdateProject id={params.project_id} />
    </HydrationBoundary>
  );
}
