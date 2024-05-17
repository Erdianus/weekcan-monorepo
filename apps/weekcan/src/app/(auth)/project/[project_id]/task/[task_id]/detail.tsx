"use client";

import type { LucideIcon } from "lucide-react";
import type { SVGProps } from "react";
import { CalendarDays, ScrollText, UserRound } from "lucide-react";

import { k } from "@hktekno/api";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import { Leader, Progress } from "@hktekno/ui/icon";
import { dateRange } from "@hktekno/ui/lib/date";

type ItemProps = {
  label: string;
  icon: LucideIcon | ((props: SVGProps<SVGSVGElement>) => JSX.Element);
  value?: string | JSX.Element;
};

const Item = (props: ItemProps) => {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-1.5">
        <props.icon className="h-5 w-5" />
        <p className="font-semibold">{props.label}</p>
      </div>
      <div className="ml-7">
        {props.value ?? <Skeleton className="h-4 w-24" />}
      </div>
    </div>
  );
};

const DetailTaskProject = ({ id }: { id: string }) => {
  const { data: task } = k.project.task.single.useQuery({ variables: { id } });
  return (
    <>
      <Item icon={ScrollText} label="Deskripsi" value={task?.data.desc} />
      <Item
        icon={CalendarDays}
        label="Tanggal"
        value={dateRange(task?.data.start_date, task?.data.end_date)}
      />
      <Item
        icon={Progress}
        label="Status"
        value={
          <Badge variant={task?.data.task_status}>
            {task?.data.task_status}
          </Badge>
        }
      />
      {task?.data.set_by &&
        `${task.data.set_by}` !== `${task.data.task_for}` && (
          <Item
            icon={Leader}
            label="Pemberi Tugas"
            value={task.data.set_by_name}
          />
        )}
      <Item
        icon={UserRound}
        label="Tugas Siapa"
        value={task?.data.task_for_name}
      />
    </>
  );
};

export default DetailTaskProject;
