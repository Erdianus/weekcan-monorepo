"use client";

import { k } from "@hktekno/api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import { shortName } from "@hktekno/ui/lib/utils";

const HelloUser = ({ id }: { id: string }) => {
  const { data: profile, isLoading } = k.user.single.useQuery({
    variables: { id },
  });

  const isload = !profile && isLoading;

  return (
    <div className="flex items-center gap-4">
      {isload ? (
        <Skeleton className="h-16 w-16 rounded-full" />
      ) : (
        <Avatar className="h-16 w-16 border-4 border-main-500">
          <AvatarImage src={profile?.data.picture_link} />
          <AvatarFallback>{shortName(profile?.data.name)}</AvatarFallback>
        </Avatar>
      )}
      <div className="font-bold">
        <div className="text-sm text-main-500">Halo</div>
        <div className="text-xl">
          {profile?.data.name ?? <Skeleton className="h-4 w-12" />}
        </div>
      </div>
    </div>
  );
};

export default HelloUser;
