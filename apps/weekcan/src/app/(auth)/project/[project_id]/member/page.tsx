import type { Metadata } from "next";

import ListMemberProject from "./list";

export const metadata: Metadata = {
  title: "Member Proyek",
};

export default async function MemberProjectPage({
  params,
}: {
  params: Promise<{ project_id: string }>;
}) {
  const { project_id } = await params;
  return <ListMemberProject id={project_id} />;
}
