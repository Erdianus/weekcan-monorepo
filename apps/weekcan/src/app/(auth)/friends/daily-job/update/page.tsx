import type { Metadata } from "next";

import UpdateDailyJob from "./update";

export const metadata: Metadata = {
  title: "Edit Tugas Harian",
};

export default function Page() {
  return (
    <>
      <UpdateDailyJob />
    </>
  );
}
