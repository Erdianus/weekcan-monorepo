import PortalSearch from "@hktekno/ui/components/portal-search";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import ListEvent from "./list";

export default function Page() {
  return (
    <>
      <PortalSearch placeholder="Cari Event..." />
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">Event</H3>
      </div>
      <ListEvent />
    </>
  );
}
