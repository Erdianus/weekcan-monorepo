import type { Metadata } from "next";

import ListCustomProject from "./list";

export const metadata: Metadata = {
  title: "Kustom Data",
};

export default function CustomProjectPage({
  params,
}: {
  params: { project_id: string | number };
}) {
  return <ListCustomProject id={params.project_id} />;
}
