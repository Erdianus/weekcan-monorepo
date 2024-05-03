import type { Metadata } from "next";

import CreateProject from "./create";

export const metadata: Metadata = {
  title: "Buat Proyek Baru",
};
export default function CreateProjectPage() {
  return (
    <>
      <CreateProject />
    </>
  );
}
