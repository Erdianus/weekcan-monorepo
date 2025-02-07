"use client";

import { k } from "@hktekno/api";
import { TabsLink } from "@hktekno/ui/components/tabs-link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { H2 } from "@hktekno/ui/components/ui/typograhpy";
import { shortName } from "@hktekno/ui/lib/utils";

const links = [
  { label: "Detail", href: "/friends" },
  { label: "Event", href: "/friends/event" },
  { label: "Tugas Harian", href: "/friends/daily-job" },
];
export default function LayoutHeader({
  friends_id,
}: {
  friends_id?: string | number;
}) {
  // const id = useUserStore((s) => s.friends_id);
  const { data: friends } = k.company.single.useQuery({
    variables: { id: friends_id },
    enabled: !!friends_id,
  });
  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <Avatar className="h-20 w-20">
          <AvatarImage src={friends?.data.picture_link ?? ""} />
          <AvatarFallback>
            {shortName(friends?.data.company_name)}
          </AvatarFallback>
        </Avatar>
        <H2 className="border-none">{friends?.data.company_name}</H2>
      </div>
      <TabsLink links={links} />
    </>
  );
}
