import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import ListUser from "./list";

export default function Page() {
  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">Laporan Absen</H3>
      </div>
      <ListUser />
    </>
  );
}
