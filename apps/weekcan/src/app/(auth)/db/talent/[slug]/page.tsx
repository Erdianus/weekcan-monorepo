import axios from "axios";
import dayjs from "dayjs";
import { Briefcase, Cake, MessageCircleWarning } from "lucide-react";

import type { inferData, k } from "@hktekno/api";
import { auth } from "@hktekno/auth";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { H3, H4 } from "@hktekno/ui/components/ui/typograhpy";

import { env } from "~/env";

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

  return (
    <>
      <H3 className="mb-2">{data.name}</H3>
      <Badge className="mb-2">{data.category.name}</Badge>
      <div className="mb-2 flex items-center gap-2 italic">
        <MessageCircleWarning />
        {data.about}
      </div>
      {data.birth_date && (
        <div className="flex items-center gap-2">
          <Cake />
          {dayjs(data.birth_date).format("DD MMMM YYYY")}
        </div>
      )}
      {data.skill.length && (
        <div className="mt-8 rounded border p-4">
          <div className="mb-3 flex items-center gap-4">
            <Briefcase size={26} />
            <H4>Keahlian</H4>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {data.skill.map((skill) => (
              <Badge variant={"outline"}>{skill.name}</Badge>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
