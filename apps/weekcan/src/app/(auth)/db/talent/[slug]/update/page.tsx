import axios from "axios";

import type { inferData, k } from "@hktekno/api";
import { auth } from "@hktekno/auth";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import { env } from "~/env";
import { UpdateTalent } from "./update";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sesh = await auth();
  const res = await axios(
    `${env.NEXT_PUBLIC_BASE_API}/api/archive/talent/${slug}`,
    {
      headers: {
        Authorization: `Bearer ${sesh?.user.token}`,
        Accept: "application/json",
      },
    },
  );

  const { data } = res.data as inferData<typeof k.hkdb.talent.single>;

  const newData = {
    ...data,
    skills: data.skill.map((v) => ({
      label: v.name,
      value: `${v.id}`,
    })),
  };

  return (
    <>
      <H3>Update Data</H3>
      <UpdateTalent slug={slug} defaultValue={newData} />
    </>
  );
}
