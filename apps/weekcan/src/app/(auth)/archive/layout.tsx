import type { PropsWithChildren } from "react";

import LayoutClient from "./layout-client";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <LayoutClient />
      {children}
    </>
  );
}
