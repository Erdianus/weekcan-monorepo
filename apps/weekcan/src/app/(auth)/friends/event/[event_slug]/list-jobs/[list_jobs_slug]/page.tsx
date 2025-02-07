import type { Metadata } from "next";

import Detail from "./detail";

export const metadata: Metadata = {
  title: "Detail Checklist",
};

export default async function Page({
  params,
}: {
  params: Promise<{ list_jobs_slug: string }>;
}) {
  const { list_jobs_slug } = await params;
  return (
    <>
      <Detail id={list_jobs_slug} />
    </>
  );
}
