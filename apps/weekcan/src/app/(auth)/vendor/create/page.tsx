import type { Metadata } from "next";

import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import { CreateVendor } from "./create";

export const metadata: Metadata = {
  title: "Buat Vendor",
};

export default function Page() {
  return (
    <>
      <H3 className="mb-4">Buat Vendor</H3>
      <CreateVendor />
    </>
  );
}
