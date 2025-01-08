"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { CalendarDays, Sparkle } from "lucide-react";

import { k } from "@hktekno/api";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import { H2 } from "@hktekno/ui/components/ui/typograhpy";
import { dateRange } from "@hktekno/ui/lib/date";

const LayoutEvent = () => {
  const pathname = usePathname();
  const params = useParams<{ company_id: string; event_slug: string }>();
  const { data: event, isLoading } = k.event.single.useQuery({
    variables: { slug: params.event_slug },
  });
  const links = useMemo(() => {
    return [
      {
        label: "Rincian",
        href: `/friends/event/${params.event_slug}/list-jobs`,
      },
      /* {
        label: "Checklist",
        href: `/friends/event/${params.event_slug}/checklist`,
      }, */
    ];
  }, [params]);
  return (
    <>
      {isLoading ? (
        <Skeleton className="mb-4 h-8 w-24" />
      ) : (
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2">
            <H2 className="border-b-0 p-0">{event?.data.name}</H2>
            {/* <Badge variant={"outline"}>Event</Badge> */}
          </div>
          <div className="mb-2 flex gap-2">
            <Sparkle />
            <div className="font-semibold">{event?.data.pic}</div>
          </div>
          <div className="mb-2 flex gap-2">
            <CalendarDays />
            <div className="font-semibold">
              {dateRange(event?.data.start_date)}
            </div>
          </div>
        </div>
      )}
      <div className="mb-4 flex h-10 w-auto min-w-0 max-w-min items-center overflow-x-auto rounded-md bg-muted p-1 text-muted-foreground">
        {links.map((link) => (
          <Link
            replace
            key={link.label}
            href={link.href}
            data-state={pathname === link.href ? "active" : "inactive"}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default LayoutEvent;
