import k, { HydrationBoundary, QueryClient, dehydrate } from "@repo/api/kit";
import { type ReactNode } from "react";
import SingleProject from "./single";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { project_id: string | number };
}) {
  const client = new QueryClient();

  await client.prefetchQuery(
    k.project.single.getFetchOptions({ id: params.project_id }),
  );

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <SingleProject id={params.project_id} />
      {children}
    </HydrationBoundary>
  );
}
