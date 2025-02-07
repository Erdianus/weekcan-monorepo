"use client";

import { k } from "@hktekno/api";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import { dateRange } from "@hktekno/ui/lib/date";

export default function Detail({ id }: { id: string }) {
  const { data: detail } = k.job.single.useQuery({ variables: { id } });
  return (
    <>
      <div className="mb-4">
        {!detail ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <H3>{detail.data.name}</H3>
        )}
        <div className="my-2 text-muted-foreground">
          {detail?.data.pic} • {dateRange(detail?.data.time)}
          <Badge variant={detail?.data.status}>{detail?.data.status}</Badge>
        </div>
      </div>
      <div className="mb-2 flex flex-wrap items-center gap-4">
        <div className="rounded-lg p-4 shadow-lg dark:border">
          <p className="text-xl text-muted-foreground">Kuantitas</p>
          {!detail ? (
            <Skeleton className="h-8 w-14" />
          ) : (
            <p className="font-bold">
              {detail.data.qty} {detail.data.unit_of_qty}
            </p>
          )}
        </div>
        <div className="rounded-lg p-4 shadow-lg dark:border">
          <p className="text-xl text-muted-foreground">Frekuensi</p>
          {!detail ? (
            <Skeleton className="w-14" />
          ) : (
            <p className="font-bold">
              {detail.data.frq} {detail.data.frq_of_use}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="mb-4 text-lg font-bold">Ganti Status</p>
      </div>
    </>
  );
}
