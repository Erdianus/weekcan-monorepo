"use client";

import { useSearchParams } from "next/navigation";

import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import Loading from "@hktekno/ui/components/loading";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { Button } from "@hktekno/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { Project, User } from "@hktekno/ui/icon";
import { relativeDate } from "@hktekno/ui/lib/date";

const ListCompanyTask = ({ company_id }: { company_id: string }) => {
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const {
    data: tasks,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = k.company.task.allInfinity.useInfiniteQuery({
    variables: { ...variables, company_id },
  });
  return (
    <>
      <PortalSearch placeholder="Cari Tugas..." />
      <Flashlist
        isloading={!tasks}
        loading={
          <Loading>
            <Skeleton className="mb-2 h-12 w-full" />
          </Loading>
        }
        isfallback={tasks?.pages[0]?.data?.length === 0}
        fallback={<div>Tidak Ada Tugas</div>}
      >
        {tasks?.pages.map((t) =>
          t.data.map((task) => (
            <div className="mb-4 flex items-center justify-between rounded-lg border border-border bg-background p-2 hover:bg-muted">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <p className="mb-2 cursor-pointer underline">
                      {task.task_name}
                    </p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-5 w-5" />
                    <span>{task.task_for_name}</span>
                  </div>
                  {task.project_name && (
                    <>
                      •
                      <div className="flex items-center gap-1">
                        <Project className="h-5 w-5" />
                        <span>{task.project_name}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end justify-end gap-2">
                <div className="text-xs text-muted-foreground">
                  {relativeDate(task.start_date, task.end_date)}
                </div>
                <Badge className="w-max" variant={task.task_status}>
                  {task.task_status}
                </Badge>
              </div>
            </div>
          )),
        )}
        {hasNextPage && (
          <div className="mt-4 flex items-center justify-center">
            <Button type="button" onClick={() => fetchNextPage()}>
              {isFetchingNextPage ? <Spinner /> : "Tampilkan Lebih"}
            </Button>
          </div>
        )}
      </Flashlist>
    </>
  );
};

export default ListCompanyTask;
