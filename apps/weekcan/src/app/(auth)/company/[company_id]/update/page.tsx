import type { Metadata } from "next";

import UpdateCompany from "./update";

export const metadata: Metadata = {
  title: "Update Perusahaan",
};

export default function CompanyPage({
  params,
}: {
  params: { company_id: string | number };
}) {
  return <UpdateCompany id={params.company_id} />;
}
