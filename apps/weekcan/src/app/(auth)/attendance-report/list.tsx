"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import Loading from "@hktekno/ui/components/loading";
import Paginate from "@hktekno/ui/components/paginate";
import PaginationParams from "@hktekno/ui/components/pagination-params";
import PortalSearch from "@hktekno/ui/components/portal-search";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import { shortName } from "@hktekno/ui/lib/utils";

export default function ListUser() {
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const { data: users, isLoading } = k.user.all.useQuery({ variables });
  const isload = !users && isLoading;
  return (
    <>
      <PortalSearch placeholder="Cari Karyawan" />
      <div className="w-full">
        <Flashlist
          isloading={isload}
          loading={
            <Loading>
              <div className="flex w-full items-center gap-4 border-b p-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-48 " />
              </div>
            </Loading>
          }
          isfallback={users?.data.length === 0}
          fallback={<div className="text-center">Data Kosong</div>}
        >
          {users?.data.map((user) => (
            <button className="flex w-full items-center gap-4 border-b p-4">
              <Avatar>
                <AvatarImage src={user.picture_link} />
                <AvatarFallback>{shortName(user.name)}</AvatarFallback>
              </Avatar>
              <Link
                className="hover:underline"
                href={`attendance-report/${user.id}`}
              >
                {user.name}
              </Link>
            </button>
          ))}
        </Flashlist>
      </div>
      <div className="mt-4 flex w-full items-center justify-end gap-5">
        <Paginate />
        <PaginationParams meta={users?.meta} />
      </div>
    </>
  );
}
