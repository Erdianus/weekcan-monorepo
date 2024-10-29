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

const LayoutClient = () => {
  const { data, isLoading } = k.company.all.useQuery();
  return (
    <>
      <div className="flex flex-wrap items-center gap-5">
        <Flashlist
          isloading={isLoading}
          loading={
            <Loading keyname="loadcompany">
              <div className="flex items-center gap-4 border px-2 py-1">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-20" />
              </div>
            </Loading>
          }
        >
          {data?.data.map((company) => (
            <Link
              href={`/archive/company/${company.id}`}
              className="flex items-center gap-4 border px-2 py-1"
            >
              <Avatar>
                <AvatarImage src={company.picture_link ?? ""} />
                <AvatarFallback>
                  {shortName(company.company_name)}
                </AvatarFallback>
              </Avatar>
              {company.company_name}
            </Link>
          ))}
        </Flashlist>
      </div>
    </>
  );
};

export default LayoutClient;
