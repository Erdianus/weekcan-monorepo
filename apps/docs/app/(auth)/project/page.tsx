import k, {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  inferVariables,
} from "@repo/api/kit";
import ListProject from "@repo/ui/pages/project/list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyek/Event",
};

export default async function ProjectPage({
  searchParams,
}: {
  searchParams: inferVariables<typeof k.project.all>;
}) {
  console.log(searchParams);
  const client = new QueryClient();

  await client.prefetchQuery(k.project.all.getFetchOptions(searchParams));
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <ListProject />
    </HydrationBoundary>
  );
}
