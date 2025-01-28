import type { Metadata } from "next";
import { ListCategorySkill } from "./list";

export const metadata: Metadata = {
  title: 'Kategori & Keahlian'
}

export default function Page() {
  return (
    <>
      <ListCategorySkill />
    </>
  );
}
