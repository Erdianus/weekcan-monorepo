import type { Metadata } from "next";

import type { Project } from "@hktekno/api/routers/project/index";
import { auth } from "@hktekno/auth";

import { env } from "~/env";
import UpdateProject from "./update";

export const metadata: Metadata = {
  title: "Update Proyek",
};

export default async function UpdateProjectPage({
  params,
}: {
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
  const { data } = (await res.json()) as { data: Project };
  const hasAccess =
    sesh &&
    ["Admin", "Owner", "Manager"].includes(sesh.user.role) &&
    `${data.pic}` === `${sesh.user.id}`;

  if (!hasAccess) throw Error("Kayaknya Sih Gak punya Akses nih");

  return <UpdateProject id={params.project_id} />;
}
