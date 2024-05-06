import type { Metadata } from "next";

import UpdateTaskProject from "./update";

export const metadata: Metadata = {
  title: "Ubah Kerjaan Proyek",
};

export default function UpdateTaskProjectPage({
  params,
}: {
  params: { project_id: string; task_id: string };
}) {
  return (
    <>
      <UpdateTaskProject id={params.task_id} project_id={params.project_id} />
    </>
  );
}
