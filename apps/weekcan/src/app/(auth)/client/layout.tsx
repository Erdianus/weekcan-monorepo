import type { PropsWithChildren } from "react";

import { auth } from "@hktekno/auth";

export default async function Layout({ children }: PropsWithChildren) {
  const sesh = await auth();

  if (sesh && !["Admin", "Owner"].includes(sesh.user.role))
    throw Error("Punya akses gak sih");

  return <>{children}</>;
}
