import type { Metadata } from "next";

import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import { FormCreateOnlineMeeting } from "./form";

export const metadata: Metadata = {
  title: "Buat Online Meeting",
};

export default function Page() {
  return (
    <>
      <H3 className="mb-4">Buat Online Meeting Baru</H3>
      <FormCreateOnlineMeeting />
    </>
  );
}
