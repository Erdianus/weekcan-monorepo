import type { Metadata } from "next";

import { auth } from "@hktekno/auth";

import { FormDailyJob } from "../form";

export const metadata: Metadata = {
  title: "Buat Kerjaanmu",
};

export default async function Page() {
  const sesh = await auth();
  return (
    <>
      <FormDailyJob user_id={sesh?.user.id ?? 0} />
    </>
  );
}
