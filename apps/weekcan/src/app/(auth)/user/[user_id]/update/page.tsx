import type { Metadata } from "next";

import UpdateUser from "./update";

export const metadata: Metadata = {
  title: "Update User",
};

export default async function UpdateUserPage({
  params,
}: {
  params: Promise<{ user_id: string | number }>;
}) {
  const { user_id } = await params;
  return <UpdateUser id={user_id} />;
}
