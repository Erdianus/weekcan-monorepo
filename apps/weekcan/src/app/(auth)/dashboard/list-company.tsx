"use client";

import Link from "next/link";

import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import Loading from "@hktekno/ui/components/loading";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import { shortName } from "@hktekno/ui/lib/utils";

const ListCompany = () => {
  const { data: companies } = k.company.all.useQuery();

  return (
    <div className="flex flex-wrap items-center justify-evenly gap-4">
      <Flashlist
        isloading={!companies}
        loading={
          <Loading>
            <Skeleton className="h-32 w-32 rounded-full" />
          </Loading>
        }
      >
        {companies?.data.map((company) => (
          <Link
            key={`company-${company.id}`}
            href={`/corps/${company.id}/task`}
          >
            <Avatar className="group relative h-32 w-32">
              <AvatarImage src={company.picture_link ?? ""} />
              <AvatarFallback>{shortName(company.company_name)}</AvatarFallback>
              <div className="absolute top-0 flex h-full w-full items-center justify-center bg-gray-900/60 text-xs opacity-0 transition-opacity group-hover:opacity-100">
                <div className="rounded-lg bg-gray-950 p-1 text-white">
                  {company.company_name}
                </div>
              </div>
            </Avatar>
          </Link>
        ))}
      </Flashlist>
    </div>
  );
};

export default ListCompany;
