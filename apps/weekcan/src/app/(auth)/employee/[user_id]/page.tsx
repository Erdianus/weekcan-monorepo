import type { Metadata } from "next";

import { DetailEmployee } from "./detail";

export const metadata: Metadata = {
  title: "Data Karyawan",
};

export default async function Page({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const { user_id } = await params;
  return (
    <>
      <DetailEmployee
        edit_data_link={`/employee/${user_id}/form`}
        user_id={user_id}
      />
    </>
  );
}
