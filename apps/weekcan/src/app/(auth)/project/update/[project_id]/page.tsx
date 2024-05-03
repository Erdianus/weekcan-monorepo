import type { Metadata } from "next";

import UpdateProject from "./update";

export const metadata: Metadata = {
  title: "Update Proyek",
};

export default function UpdateProjectPage({
  params,
}: {
  params: { project_id: string | number };
}) {
  return <UpdateProject id={params.project_id} />;
}
