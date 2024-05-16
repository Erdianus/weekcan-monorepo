"use client";

import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import Loading from "@hktekno/ui/components/loading";
import { Badge } from "@hktekno/ui/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import { Project, User } from "@hktekno/ui/icon";
import { relativeDate } from "@hktekno/ui/lib/date";

const ListCompanyTask = ({ company_id }: { company_id: string }) => {
  const { data: tasks } = k.company.task.all.useQuery({
    variables: { company_id },
  });
  return (
    <>
      <Flashlist
        isloading={!tasks}
        loading={
          <Loading>
            <Skeleton className="mb-2 h-12 w-full" />
          </Loading>
        }
        isfallback={tasks?.data.length === 0}
        fallback={<div>Tidak Ada Tugas</div>}
      >
        {tasks?.data.map((task) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="mb-4 flex items-center justify-between rounded-lg border border-border bg-background p-2 hover:bg-muted">
                <div>
                  <p className="mb-2">{task.task_name}</p>
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
        ))}
      </Flashlist>
    </>
  );
};

export default ListCompanyTask;
