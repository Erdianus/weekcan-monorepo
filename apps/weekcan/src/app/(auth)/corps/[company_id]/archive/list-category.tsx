"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Plus } from "lucide-react";

import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import Loading from "@hktekno/ui/components/loading";
import { Button } from "@hktekno/ui/components/ui/button";
import { Separator } from "@hktekno/ui/components/ui/separator";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import { slug } from "@hktekno/ui/lib/utils";

const ListArchiveCategory = () => {
  const pathname = usePathname();
  const params = useParams<{ company_id: string }>();
  const { data: company, isLoading } = k.company.single.useQuery({
    variables: { id: params.company_id },
  });

  return (
    <>
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          Kategori
          <Button variant={"outline"} size={"icon"} className="h-8 w-8">
            <Plus size={16} />
          </Button>
          <Separator className="flex-1" />
        </div>
        <div className="flex flex-wrap gap-4">
          <Flashlist
            isloading={isLoading}
            loading={
              <Loading>
                <Skeleton className="h-9 w-14 rounded-full" />
              </Loading>
            }
            isfallback={company?.data.archive_category.length === 0}
            fallback={<div>Kategori Kosong</div>}
          >
            {company?.data.archive_category.map((category) => {
              const href = `/corps/${params.company_id}/archive/${slug(category.archive_name)}`;
              return (
                <Button
                  variant={pathname === href ? "default" : "outline"}
                  key={`cat-${category.id}`}
                  type="button"
                  size={"sm"}
                  className="rounded-full"
                  asChild
                >
                  <Link
                    href={
                      pathname === href
                        ? `/corps/${params.company_id}/archive`
                        : href
                    }
                  >
                    {category.archive_name}
                  </Link>
                </Button>
              );
            })}
          </Flashlist>
        </div>
      </div>
    </>
  );
};

export default ListArchiveCategory;
