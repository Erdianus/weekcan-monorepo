import type { Metadata } from "next";

import CreateDailyJob from "./create";

export const metadata: Metadata = {
  title: "Buat Tugas Harian",
};

export default function Page() {
  return (
    <>
      <CreateDailyJob />
    </>
  );
}
