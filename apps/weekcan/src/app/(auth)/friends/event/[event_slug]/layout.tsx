import type { ReactNode } from "react";

import LayoutEvent from "./layout-header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <LayoutEvent />
      {children}
    </>
  );
}
