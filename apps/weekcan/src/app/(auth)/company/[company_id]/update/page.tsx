import type { Metadata } from "next";

import UpdateCompany from "./update";

export const metadata: Metadata = {
  title: "Update Perusahaan",
};

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ company_id: string | number }>;
}) {
  const { company_id } = await params;
  return <UpdateCompany id={company_id} />;
}
