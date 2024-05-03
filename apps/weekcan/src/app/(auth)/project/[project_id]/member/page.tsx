import type { Metadata } from "next";

import ListMemberProject from "./list";

export const metadata: Metadata = {
  title: "Member Proyek",
};

export default function MemberProjectPage({
  params,
}: {
  params: { project_id: string };
}) {
  return <ListMemberProject id={params.project_id} />;
}
