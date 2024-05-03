import type { Metadata } from "next";

import ListSprint from "./list";

export const metadata: Metadata = {
  title: "Jadwal Proyek",
};

export default function SprintProjectPage({
  params,
}: {
  params: { project_id: string };
}) {
  return <ListSprint project_id={params.project_id} />;
}
