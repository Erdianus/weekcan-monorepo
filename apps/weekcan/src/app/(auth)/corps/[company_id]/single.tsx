"use client";

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
  const { data: company } = k.company.single.useQuery({ variables: { id } });
  return (
    <div className="mb-4 flex items-center gap-3">
      {company?.data.picture_link ? (
        <Avatar className="h-20 w-20">
          <AvatarImage src={company.data.picture_link} />
          <AvatarFallback>
            {shortName(company.data.company_name)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Skeleton className="h-44 w-44" />
      )}
      <H2 className="border-none">
        {company?.data.company_name ?? <Skeleton className="w-12" />}{" "}
      </H2>
    </div>
  );
};

export default SingleCorps;
