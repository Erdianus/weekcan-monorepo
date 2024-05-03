import type { Metadata } from "next";

import ListCompany from "./list";

export const metadata: Metadata = {
  title: "Perusahaan",
};

export default function CompanyPage() {
  return <ListCompany />;
}
