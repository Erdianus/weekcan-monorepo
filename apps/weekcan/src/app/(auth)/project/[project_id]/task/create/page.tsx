import type { Metadata } from "next";

import CreateTask from "./create";

export const metadata: Metadata = {
  title: "Buat Kerjaan Baru",
};

export default async function CreateTaskPage({
  params,
}: {
  params: Promise<{ project_id: string }>;
}) {
  const { project_id } = await params;

  return (
    <>
      <CreateTask project_id={project_id} />
    </>
  );
}
