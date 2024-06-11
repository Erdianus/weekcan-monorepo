import type { ReactNode } from "react";

import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import ListArchiveCategory from "./list-category";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <H3 className="mb-6">Arsip</H3>
      <ListArchiveCategory />
      {children}
    </>
  );
}
