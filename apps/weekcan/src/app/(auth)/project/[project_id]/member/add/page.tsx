import type { Metadata } from "next";

import CreateMember from "./create";

export const metadata: Metadata = {
  title: "Tambah Anggota",
};

export default async function CreateMemberPage({
  params,
}: {
  params: Promise<{ project_id: string }>;
}) {
  const { project_id } = await params;
  return <CreateMember id={project_id} />;
}
