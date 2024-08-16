import type { PropsWithChildren } from "react";

import type { inferData, k } from "@hktekno/api";
import { auth } from "@hktekno/auth";
import { TabsLink } from "@hktekno/ui/components/tabs-link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { H2 } from "@hktekno/ui/components/ui/typograhpy";
import { shortName } from "@hktekno/ui/lib/utils";
import Axios from "@hktekno/utils/axios";

const links = [
  { label: "Detail", href: "/friends" },
  { label: "Event", href: "/friends/event" },
  { label: "Tugas Harian", href: "/friends/daily-job" },
];

export default async function Layout({ children }: PropsWithChildren) {
  const sesh = await auth();
  const { data: friends } = await Axios<inferData<typeof k.company.single>>(
    `/company/${sesh?.user.friends_id}`,
    {
      headers: {
        Authorization: `Bearer ${sesh?.user.token}`,
      },
    },
  );
  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <Avatar className="h-20 w-20">
          <AvatarImage src={friends.data.picture_link ?? ""} />
          <AvatarFallback>
            {shortName(friends.data.company_name)}
          </AvatarFallback>
        </Avatar>
        <H2 className="border-none">{friends.data.company_name}</H2>
      </div>
      <TabsLink links={links} />
      {children}
    </>
  );
}
