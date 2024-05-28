import type { Metadata } from "next";

import ListWarehouse from "./list";

export const metadata: Metadata = {
  title: "Gudang",
};

export default function Page() {
  return (
    <>
      <ListWarehouse />
    </>
  );
}
