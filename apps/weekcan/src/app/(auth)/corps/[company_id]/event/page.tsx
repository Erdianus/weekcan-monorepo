import type { Metadata } from "next";

import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import ListEventCompany from "./list";

export const metadata: Metadata = {
  title: "Event",
};

export default function Page() {
  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">Event</H3>
      </div>
      <ListEventCompany />
    </>
  );
}
