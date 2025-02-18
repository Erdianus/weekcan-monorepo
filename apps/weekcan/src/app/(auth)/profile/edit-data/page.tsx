import { auth } from "@hktekno/auth";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import { DataEmployeeForm } from "../../employee/[user_id]/form";

export default async function Page() {
  const sesh = await auth();
  return (
    <>
      <H3 className="mb-8">Data Karyawan</H3>
      <DataEmployeeForm user_id={sesh?.user.id ?? ""} />
    </>
  );
}
