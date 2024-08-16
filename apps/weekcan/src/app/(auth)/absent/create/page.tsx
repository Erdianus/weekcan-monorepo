import type { Metadata } from "next";

import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import CreateAbsent from "./create";

export const metadata: Metadata = {
  title: "Buat Izin",
};

const Page = () => {
  return (
    <>
      <H3 className="mb-4">Buat Izin Baru</H3>
      <CreateAbsent />
    </>
  );
};

export default Page;
