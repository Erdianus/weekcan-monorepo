import type { Metadata } from "next";

import CreateItem from "./create";

export const metadata: Metadata = {
  title: "Buat Barang",
};

export default function Page() {
  return (
    <>
      <CreateItem />
    </>
  );
}
