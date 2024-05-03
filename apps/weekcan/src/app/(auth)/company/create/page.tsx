import type { Metadata } from "next";

import CreateCompany from "./create";

export const metadata: Metadata = {
  title: "Buat Perusahaan",
};
export default function CreateCompanyPage() {
  return (
    <>
      <CreateCompany />
    </>
  );
}
