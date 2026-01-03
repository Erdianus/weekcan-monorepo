import type { Metadata } from "next";

import ListFileProject from "./list";

export const metadata: Metadata = {
  title: "File Proyek",
};

export default async function CustomProjectPage({
  params,
}: {
  params: Promise<{ project_id: string | number }>;
}) {
  const { project_id } = await params;
  return <ListFileProject id={project_id} />;
}
