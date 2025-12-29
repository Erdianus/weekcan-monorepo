import type { Metadata } from "next";

import DetailProject from "./detail";

export const metadata: Metadata = {
  title: "Project Single",
};

export default async function Page({
  params,
}: {
  params: Promise<{ project_id: string | number }>;
}) {
  const { project_id } = await params;
  return (
    <>
      <DetailProject id={project_id} />
    </>
  );
}
