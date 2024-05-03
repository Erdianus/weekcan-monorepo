"use client";

import type { LucideIcon } from "lucide-react";
import type { SVGProps } from "react";
import { CalendarDays, ScrollText } from "lucide-react";

import { k } from "@hktekno/api";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import {
  Client,
  Company,
  Leader,
  Progress,
  Status,
  Venue,
} from "@hktekno/ui/icon";
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
      <Item
        icon={Company}
        label="Perusahaan"
        value={
          <div>
            {project?.data.company.map((c) => (
              <div key={`company-${c.id}`}>{c.company_name}</div>
            ))}
          </div>
        }
      />
    </>
  );
};

export default DetailProject;
