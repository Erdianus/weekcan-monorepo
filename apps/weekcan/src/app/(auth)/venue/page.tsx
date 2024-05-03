import type { Metadata } from "next";

import ListVenue from "./list";

export const metadata: Metadata = {
  title: "Klien",
};

export default function VenuePage() {
  return <ListVenue />;
}
