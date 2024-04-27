"use client";
import k from "@repo/api/kit";
import { Badge } from "@repo/ui/components/ui/badge";
import { dateRange } from "@repo/ui/lib/date";
import { Client, Company, Leader, Progress, Status, Venue } from "@ui/components/icon";
import { Skeleton } from "@ui/components/ui/skeleton";
import {
  type LucideIcon,
  ScrollText,
  CalendarDays,
} from "lucide-react";
import { SVGProps } from "react";

type ItemProps = {
  label: string;
  icon: LucideIcon | ((props: SVGProps<SVGSVGElement>) => JSX.Element);
  value?: string | JSX.Element;
};

const Item = (props: ItemProps) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-1.5 mb-2">
        <props.icon className="w-5 h-5" />
        <p className="font-semibold">{props.label}</p>
      </div>
      <div className="ml-7">
        {props.value ?? <Skeleton className="w-24 h-4" />}
      </div>
    </div>
  );
};

const DetailProject = ({ id }: { id: string | number }) => {
  const { data: project } = k.project.single.useQuery({ variables: { id } });

  return (
    <>
      <Item icon={ScrollText} label="Deskripsi" value={project?.data.desc} />
      <Item
        icon={CalendarDays}
        label="Timeline"
        value={dateRange(project?.data.start_date, project?.data.end_date)}
      />
      <Item icon={Venue} label="Lokasi" value={project?.data.location} />
      <Item icon={Client} label="Klien" value={project?.data.client_name} />
      <Item icon={Status} label="Status" value={project?.data.status} />
      <Item
        icon={Progress}
        label="Progress"
        value={
          <Badge variant={project?.data.progress}>
            {project?.data.progress}
          </Badge>
        }
      />
      <Item
        icon={Leader}
        label="Person In Charge"
        value={project?.data.pic_name}
      />
      <Item icon={Company} label="Perusahaan" value={project?.data.company[0]?.company_name} />
    </>
  );
};

export default DetailProject;
