import type { Metadata } from "next";

import ListUser from "./list";

export const metadata: Metadata = {
  title: "User",
};

export default function UserPage() {
  return <ListUser />;
}
