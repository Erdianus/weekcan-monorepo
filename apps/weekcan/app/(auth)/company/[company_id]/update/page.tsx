import k, {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@repo/api/kit";
import UpdateCompany from '@repo/ui/pages/company/update';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Perusahaan",
};

export default async function CompanyPage({
  params,
}: {
  params: {company_id: string | number}
}) {
  const client = new QueryClient();

  await client.prefetchQuery(k.company.single.getFetchOptions({id: params.company_id}));

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <UpdateCompany id={params.company_id} />
    </HydrationBoundary>
  );
}
