import type { Metadata } from "next";

import ListStock from "./stock/list";

export const metadata: Metadata = {
  title: "Detail Gudang",
};

export default function Page({ params }: { params: { warehouse_id: string } }) {
  return (
    <>
      <ListStock warehouse_id={params.warehouse_id} />
    </>
  );
}
