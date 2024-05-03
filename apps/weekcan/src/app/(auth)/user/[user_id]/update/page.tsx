import type { Metadata } from "next";

import UpdateUser from "./update";

export const metadata: Metadata = {
  title: "Update User",
};

export default function UpdateUserPage({
  params,
}: {
  params: { user_id: string | number };
}) {
  return <UpdateUser id={params.user_id} />;
}
