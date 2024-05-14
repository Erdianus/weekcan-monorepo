import type { ReactNode } from "react";

import { auth } from "@hktekno/auth";
import { env } from "@hktekno/auth/env";

import SingleProject from "./single";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { project_id: string | number };
}) {
  const sesh = await auth();
  const res = await fetch(
    `${env.NEXT_PUBLIC_BASE_API}/api/project/${params.project_id}`,
    {
      headers: {
        Authorization: `Bearer ${sesh?.user.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );
  if (res.status === 400) throw Error("Proyek Tidak Ditemukan");
  if (res.status === 401) throw Error("Kamu Punya Gak Punya Akses");
  return (
    <>
      <SingleProject id={params.project_id} />
      {children}
    </>
  );
}
