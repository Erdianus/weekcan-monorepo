import type { Metadata } from "next";

import ListTaskProject from "./list";

export const metadata: Metadata = {
  title: "Kerjaan Proyek",
};

export default async function TaskProjectPage({
  params,
}: {
  params: Promise<{ project_id: string }>;
}) {
  const { project_id } = await params;
  return (
    <>
      <ListTaskProject project_id={project_id} />
    </>
  );
}
