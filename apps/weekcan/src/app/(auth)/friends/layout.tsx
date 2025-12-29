import type { PropsWithChildren } from "react";

import { auth } from "@hktekno/auth";

import LayoutHeader from "./layout-header";

export default async function Layout({ children }: PropsWithChildren) {
  const sesh = await auth();
  return (
    <>
      {sesh?.user.friends_id && (
        <LayoutHeader friends_id={sesh?.user.friends_id} />
      )}
      {children}
    </>
  );
}
