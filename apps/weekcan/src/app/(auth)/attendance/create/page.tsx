import type { Metadata } from "next";

import CreateAttendance from "./create";

export const metadata: Metadata = {
  title: "Kehadiran",
};

export default function Page() {
  return (
    <>
      <CreateAttendance />
    </>
  );
}
