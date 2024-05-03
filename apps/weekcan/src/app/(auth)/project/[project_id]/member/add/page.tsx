import type { Metadata } from "next";

import CreateMember from "./create";

export const metadata: Metadata = {
  title: "Tambah Anggota",
};

export default function CreateMemberPage({
  params,
}: {
  params: { project_id: string };
}) {
  return <CreateMember id={params.project_id} />;
}
