"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { Meta } from "@hktekno/api/routers/meta";

import Loading from "./loading";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Skeleton } from "./ui/skeleton";

const PaginationParams = ({ meta }: { meta?: Meta }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  if (!meta)
    return (
      <Loading keyname="loadpage">
        <Skeleton className="mr-2 h-8 w-8" />;
      </Loading>
    );

  return (
    <Pagination className="mx-0 w-auto justify-start">
      <PaginationContent>
        {meta.links.map((link, i) => {
          const { last_page } = meta;
          const prev = i === 0;
          const next = i === meta.links.length - 1;
          const page = !prev && !next;
          return (
            <PaginationItem key={`pageitem-${i}`}>
              {prev && (
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() => {
                    const page = !Number.isNaN(searchParams.get("page"))
                      ? Number(searchParams.get("page"))
                      : 1;
                    if (page <= 1) return;
                    const params = new URLSearchParams(searchParams);
                    params.set("page", `${page - 1}`);
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                />
              )}
              {next && (
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() => {
                    const page = Number.isInteger(searchParams.get("page"))
                      ? Number(searchParams.get("page"))
                      : 1;
                    const params = new URLSearchParams(searchParams);
                    if (page === last_page) return;
                    params.set("page", `${page + 1}`);
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                />
              )}
              {page && (
                <PaginationLink
                  className="hidden cursor-pointer sm:flex"
                  isActive={link.active}
                  onClick={() => {
                    if (link.active) return;
                    const params = new URLSearchParams(searchParams);
                    params.set("page", `${link.label}`);
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                >
                  {link.label}
                </PaginationLink>
              )}
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
};

const PaginationMore = ({ meta }: { meta?: { hasMore: boolean } }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  if (!meta)
    return (
      <Loading keyname="loadpage">
        <Skeleton className="mr-2 h-8 w-8" />;
      </Loading>
    );

  return (
    <>
      <Pagination className="mx-0 w-auto justify-start">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={
                !searchParams.get("page") || searchParams.get("page") === "1"
              }
              className="cursor-pointer"
              onClick={() => {
                const page = !Number.isNaN(searchParams.get("page"))
                  ? Number(searchParams.get("page"))
                  : 1;
                if (page <= 1) return;
                const params = new URLSearchParams(searchParams);
                params.set("page", `${page - 1}`);
                router.push(`${pathname}?${params.toString()}`);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>
              {searchParams.get("page") ?? "1"}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              aria-disabled={!meta.hasMore}
              className="cursor-pointer"
              onClick={() => {
                const page = Number.isInteger(searchParams.get("page"))
                  ? Number(searchParams.get("page"))
                  : 1;
                const params = new URLSearchParams(searchParams);
                if (!meta.hasMore) return;
                params.set("page", `${page + 1}`);
                router.push(`${pathname}?${params.toString()}`);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export { PaginationMore, PaginationParams };

export default PaginationParams;
