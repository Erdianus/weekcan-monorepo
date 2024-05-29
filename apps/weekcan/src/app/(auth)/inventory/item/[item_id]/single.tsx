"use client";

import dayjs from "dayjs";
import { ArrowDownWideNarrow, CalendarOff, Package } from "lucide-react";

import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import { ItemDetail } from "@hktekno/ui/components/item-detail";
import Loading from "@hktekno/ui/components/loading";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { Separator } from "@hktekno/ui/components/ui/separator";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import { shortName } from "@hktekno/ui/lib/utils";

const SingleItem = ({ id }: { id: string }) => {
  const { data: item, isLoading } = k.inventory.item.single.useQuery({
    variables: { id },
  });
  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        {!item && isLoading ? (
          <>
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-6 w-20" />
          </>
        ) : (
          <>
            <Avatar className="h-12 w-12 rounded">
              <AvatarImage src={item?.data.picture_link} />
              <AvatarFallback>{shortName(item?.data.name)}</AvatarFallback>
            </Avatar>
            <div>
              <H3>{item?.data.name}</H3>
              <p className="text-sm text-muted-foreground">
                Total:{" "}
                <span className="text-foreground">{`${item?.data.qty}${item?.data.unit}`}</span>{" "}
              </p>
            </div>
          </>
        )}
      </div>
      <Flashlist
        isloading={isLoading}
        loading={
          <Loading length={2}>
            <div className="mb-4 flex items-center gap-1">
              <div className="text-lg font-semibold">
                <Skeleton className="h-6 w-20" />
              </div>
              <Separator className="flex-1" />
            </div>
            <ItemDetail
              icon={CalendarOff}
              label="Tanggal Kadaluarsa"
              value={undefined}
            />
            <ItemDetail icon={Package} label="Stock" value={undefined} />
            <ItemDetail
              icon={ArrowDownWideNarrow}
              label="Keterangan"
              value={undefined}
            />
          </Loading>
        }
      >
        {item?.data.warehouse_item.map((warehouse) => (
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-1">
              <div className="text-lg font-semibold">{warehouse.name}</div>
              <Separator className="flex-1" />
            </div>
            <ItemDetail
              icon={CalendarOff}
              label="Tanggal Kadaluarsa"
              value={dayjs(warehouse.warehouse_item.expired_date).format(
                "DD MMMM YYYY",
              )}
            />
            <ItemDetail
              icon={Package}
              label="Stock"
              value={warehouse.warehouse_item.qty}
            />
            <ItemDetail
              icon={ArrowDownWideNarrow}
              label="Keterangan"
              value={warehouse.warehouse_item.ket}
            />
          </div>
        ))}
      </Flashlist>
    </>
  );
};

export default SingleItem;
