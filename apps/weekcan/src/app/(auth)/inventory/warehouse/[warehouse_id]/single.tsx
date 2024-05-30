"use client";

import { k } from "@hktekno/api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import { shortName } from "@hktekno/ui/lib/utils";

const SingleWarehouse = ({ id }: { id: string }) => {
  const { data: warehouse } = k.inventory.warehouse.single.useQuery({
    variables: { id },
  });

  if (!warehouse)
    return (
      <div>
        <Skeleton className="mb-1 h-8 w-32" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-16 " />
        </div>
      </div>
    );

  return (
    <div>
      <H3>{warehouse.data.name}</H3>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Avatar className="h-8 w-8">
          <AvatarImage src={warehouse.data.company.picture_link} />
          <AvatarFallback>
            {shortName(warehouse.data.company.company_name)}
          </AvatarFallback>
        </Avatar>
        <div className="">{warehouse.data.company.company_name}</div>
      </div>
    </div>
  );
};

export default SingleWarehouse;
