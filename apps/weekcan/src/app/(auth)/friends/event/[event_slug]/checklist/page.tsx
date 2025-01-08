import type { Metadata } from "next";

import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import CheckList from "./list";

export const metadata: Metadata = {
  title: "Checklist Event",
};

export default function Page() {
  return (
    <>
      <H3 className="mb-4">Checklist</H3>
      <CheckList />
    </>
  );
}
