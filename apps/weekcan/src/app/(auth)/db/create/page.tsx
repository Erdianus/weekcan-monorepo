import type { Metadata } from "next";

import { CreateTalent } from "./create";

export const metadata: Metadata = {
  title: "Buat Data Baru",
};

export default function Page() {
  return (
    <>
      <CreateTalent />
    </>
  );
}
