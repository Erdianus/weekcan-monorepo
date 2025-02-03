import type { Metadata } from "next";

import { auth } from "@hktekno/auth";

import ListDailyJobUser from "./list";

export const metadata: Metadata = {
  title: "Tugas Harian",
};

export default async function Page() {
  const sesh = await auth();
  return (
    <>
      <ListDailyJobUser role={sesh?.user.role} />
    </>
  );
}
