"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { k } from "@hktekno/api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import { H2 } from "@hktekno/ui/components/ui/typograhpy";
import { shortName } from "@hktekno/ui/lib/utils";

const SingleCorps = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const { data: company } = k.company.single.useQuery({ variables: { id } });

  const links = useMemo(() => {
    return [
      { label: "Detail", href: `/corps/${id}` },
      { label: "Event", href: `/corps/${id}/event` },
      // { label: "Tugas Event", href: `/corps/${id}/event-jobs` },
      { label: "Tugas Harian", href: `/corps/${id}/daily-job` },
    ];
  }, [id]);

  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        {company ? (
          <Avatar className="h-20 w-20">
            <AvatarImage src={company.data.picture_link ?? ""} />
            <AvatarFallback>
              {shortName(company.data.company_name)}
            </AvatarFallback>
          </Avatar>
        ) : (
          <Skeleton className="h-20 w-20 rounded-full " />
        )}
        <H2 className="border-none">
          {company?.data.company_name ?? <Skeleton className="w-12" />}{" "}
        </H2>
      </div>
      <div className="mb-4 flex h-10 w-auto min-w-0 max-w-min items-center overflow-x-auto rounded-md bg-muted p-1 text-muted-foreground">
        {links.map((link) => (
          <Link
            replace
            key={link.label}
            href={link.href}
            data-state={pathname === link.href ? "active" : "inactive"}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-main-500  data-[state=active]:text-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-main-900"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default SingleCorps;
