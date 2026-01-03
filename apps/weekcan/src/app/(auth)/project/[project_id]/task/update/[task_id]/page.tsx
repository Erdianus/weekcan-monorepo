import type { Metadata } from "next";

import UpdateTaskProject from "./update";

export const metadata: Metadata = {
  title: "Ubah Kerjaan Proyek",
};

export default async function UpdateTaskProjectPage({
  params,
}: {
  params: Promise<{ project_id: string; task_id: string }>;
}) {
  const { project_id, task_id } = await params;
  return (
    <>
      <UpdateTaskProject id={task_id} project_id={project_id} />
    </>
  );
}
