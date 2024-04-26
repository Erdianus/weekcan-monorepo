import ListProject from "@repo/ui/pages/project/list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyek/Event",
};

export default function ProjectPage() {
  return (
    <div>
      <ListProject />
    </div>
  );
}
