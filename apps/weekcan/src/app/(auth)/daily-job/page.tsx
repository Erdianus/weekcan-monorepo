import type { Metadata } from "next";

import PortalSearch from "@hktekno/ui/components/portal-search";

import ListDailyJobs from "./list";

export const metadata: Metadata = {
  title: "Tugas Harian",
};

export default function Page() {
  return (
    <>
      <PortalSearch placeholder="Cari Tugas..." />
      <ListDailyJobs />
    </>
  );
}
