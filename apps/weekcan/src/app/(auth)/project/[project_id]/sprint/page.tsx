import type { Metadata } from "next";

import ListSprint from "./list";

export const metadata: Metadata = {
  title: "Jadwal Proyek",
};

export default async function SprintProjectPage({
  params,
}: {
  params: Promise<{ project_id: string }>;
}) {
  const { project_id } = await params;
  return <ListSprint project_id={project_id} />;
}
