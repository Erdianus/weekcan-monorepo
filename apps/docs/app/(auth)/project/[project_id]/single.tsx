"use client";

import k from "@repo/api/kit";
import { Skeleton } from "@ui/components/ui/skeleton";
import { H2 } from "@ui/components/ui/typograhpy";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const SingleProject = ({ id }: { id: string | number }) => {
  const pathname = usePathname();
  const { data: project } = k.project.single.useQuery({ variables: { id } });

  const links = useMemo(() => {
    return [
      { label: "Detail", href: `/project/${id}` },
      { label: "Tugas", href: `/project/${id}/task` },
      { label: "Kustom", href: `/project/${id}/custom` },
      { label: "Files", href: `/project/${id}/files` },
      { label: "Anggota", href: `/project/${id}/member` },
      { label: "Jadwal", href: `/project/${id}/timeline` },
    ];
  }, [id]);

  return (
    <>
      <H2 className="border-b-0 mb-4">
        {project?.data.project_name ?? <Skeleton className="w-24 h-8" />}
      </H2>
      <div className="flex max-w-min min-w-0 w-auto mb-4 h-10 items-center rounded-md bg-muted p-1 text-muted-foreground overflow-x-auto">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            data-state={pathname === link.href ? "active" : "inactive"}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-main-500 data-[state=active]:text-white dark:data-[state=active]:bg-main-900 data-[state=active]:text-400 data-[state=active]:shadow-sm"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default SingleProject;
