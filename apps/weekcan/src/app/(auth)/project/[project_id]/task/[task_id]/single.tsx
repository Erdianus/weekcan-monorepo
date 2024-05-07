"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { k } from "@hktekno/api";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import { H2 } from "@hktekno/ui/components/ui/typograhpy";

const SingleTaskProject = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const params = useParams<{ project_id: string }>();
  const { data: task } = k.project.task.single.useQuery({ variables: { id } });
  const links = useMemo(() => {
    return [
      { label: "Rincian", href: `/project/${params.project_id}/task/${id}` },
      {
        label: "Perihal",
        href: `/project/${params.project_id}/task/${id}/daily`,
      },
    ];
  }, [id]);

  return (
    <>
      <H2 className="mb-4 border-b-0">
        {task?.data.task_name ?? <Skeleton className="h-8 w-24" />}
      </H2>
      <div className="mb-4 flex h-10 w-auto min-w-0 max-w-min items-center overflow-x-auto rounded-md bg-muted p-1 text-muted-foreground">
        {links.map((link) => (
          <Link
            replace
            key={link.label}
            href={link.href}
            data-state={pathname === link.href ? "active" : "inactive"}
            className="data-[state=active]:text-400 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default SingleTaskProject;
