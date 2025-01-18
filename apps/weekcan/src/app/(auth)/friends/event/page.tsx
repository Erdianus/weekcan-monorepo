import type { Metadata } from "next";

import { auth } from "@hktekno/auth";

import ListEvent from "./list";

export const metadata: Metadata = {
  title: "List Event",
};

export default async function Page() {
  const sesh = await auth();
  return (
    <>
      <ListEvent role={sesh?.user.role} />
    </>
  );
}
