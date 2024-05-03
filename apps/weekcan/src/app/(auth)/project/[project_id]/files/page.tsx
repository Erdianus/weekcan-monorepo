import type { Metadata } from "next";

import ListFileProject from "./list";

export const metadata: Metadata = {
  title: "File Proyek",
};

export default function CustomProjectPage({
  params,
}: {
  params: { project_id: string | number };
}) {
  return <ListFileProject id={params.project_id} />;
}
