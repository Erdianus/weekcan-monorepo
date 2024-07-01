import type { Metadata } from "next";

import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import ListJobs from "./list";

export const metadata: Metadata = {
  title: "Rincian Event",
};

export default function Page() {
  return (
    <>
      <H3 className="mb-4">Rincian</H3>
      <ListJobs />
    </>
  );
}
