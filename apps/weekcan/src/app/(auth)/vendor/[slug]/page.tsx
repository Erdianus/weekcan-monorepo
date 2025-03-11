import { Metadata } from "next";

import { DetailVendor } from "./detail";

export const metadata: Metadata = {
  title: "Data Vendor",
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <DetailVendor slug={slug} />
    </>
  );
}
