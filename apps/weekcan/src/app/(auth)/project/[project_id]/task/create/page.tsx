import type { Metadata } from "next";

import CreateTask from "./create";

export const metadata: Metadata = {
  title: "Buat Kerjaan Baru",
};

export default function CreateTaskPage({
  params,
}: {
  params: { project_id: string };
}) {
  return (
    <>
      <CreateTask project_id={params.project_id} />
    </>
  );
}
