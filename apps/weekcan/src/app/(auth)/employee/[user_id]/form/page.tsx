import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import { DataEmployeeForm } from "../form";

export default async function Page({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const { user_id } = await params;
  return (
    <>
      <H3 className="mb-8">Data Karyawan</H3>
      <DataEmployeeForm user_id={user_id} />
    </>
  );
}
