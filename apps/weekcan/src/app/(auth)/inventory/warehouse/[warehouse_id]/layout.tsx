import type { ReactNode } from "react";

import { Separator } from "@hktekno/ui/components/ui/separator";

import SingleWarehouse from "./single";

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { warehouse_id: string };
}) {
  return (
    <>
      <SingleWarehouse id={params.warehouse_id} />
      <Separator className="mb-4 mt-2" />
      {children}
    </>
  );
}
