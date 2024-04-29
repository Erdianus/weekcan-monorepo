'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Skeleton } from '@ui/components/ui/skeleton';
import { H2 } from '@ui/components/ui/typograhpy';

import k from '@repo/api/kit';

const SingleProject = ({ id }: { id: string | number }) => {
  const pathname = usePathname();
  const { data: project } = k.project.single.useQuery({ variables: { id } });

  const links = useMemo(() => {
    return [
      { label: 'Detail', href: `/project/${id}` },
      { label: 'Tugas', href: `/project/${id}/task` },
      { label: 'Kustom', href: `/project/${id}/custom` },
      { label: 'Files', href: `/project/${id}/files` },
      { label: 'Anggota', href: `/project/${id}/member` },
      { label: 'Jadwal', href: `/project/${id}/sprint` },
    ];
  }, [id]);

  return (
    <>
      <H2 className="mb-4 border-b-0">
        {project?.data.project_name ?? <Skeleton className="h-8 w-24" />}
      </H2>
      <div className="mb-4 flex h-10 w-auto min-w-0 max-w-min items-center overflow-x-auto rounded-md bg-muted p-1 text-muted-foreground">
        {links.map((link) => (
          <Link
            replace
            key={link.label}
            href={link.href}
            data-state={pathname === link.href ? 'active' : 'inactive'}
            className="data-[state=active]:text-400 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-main-500 data-[state=active]:text-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-main-900"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default SingleProject;
