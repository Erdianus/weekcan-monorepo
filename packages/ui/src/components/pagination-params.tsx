"use client";

import { Meta } from "@repo/api/router/meta";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

const PaginationParams = ({ meta }: { meta?: Meta }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  if (!meta) return <Skeleton className="w-44" />;

  return (
    <Pagination className="justify-start w-auto mx-0">
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
                    replace(`${pathname}?${params.toString()}`);
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
                    replace(`${pathname}?${params.toString()}`);
                  }}
                />
              )}
              {page && (
                <PaginationLink
                  className="cursor-pointer hidden sm:flex"
                  isActive={link.active}
                  onClick={() => {
                    if (link.active) return;
                    const params = new URLSearchParams(searchParams);
                    params.set("page", `${link.label}`);
                    replace(`${pathname}?${params.toString()}`);
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
