"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { Meta } from "@hktekno/api/routers/meta";

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

  if (!meta) return <Skeleton className="h-8 w-1/5" />;

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
                    console.log(page);
                    const params = new URLSearchParams(searchParams);
                    params.set("page", `${page - 1}`);
                    router.replace(`${pathname}?${params.toString()}`);
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
                    router.replace(`${pathname}?${params.toString()}`);
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
                    router.replace(`${pathname}?${params.toString()}`);
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

export default PaginationParams;
