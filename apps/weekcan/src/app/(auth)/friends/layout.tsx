import type { PropsWithChildren } from "react";

import LayoutHeader from "./layout-header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <LayoutHeader />
      {children}
    </>
  );
}
