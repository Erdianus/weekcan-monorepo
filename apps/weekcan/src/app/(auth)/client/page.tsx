import type { Metadata } from "next";

import ListClient from "./list";

export const metadata: Metadata = {
  title: "Klien",
};

export default function VenuePage() {
  return <ListClient />;
}
