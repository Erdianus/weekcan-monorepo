import { Metadata } from "next";

import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import { UpdateVendor } from "./update";

export const metadata: Metadata = {
  title: "Update Vendor",
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <H3 className="mb-4">Update Vendor</H3>
      <UpdateVendor slug={slug} />
    </>
  );
}
