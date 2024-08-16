"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TabsLink = ({ links }: { links: { label: string; href: string }[] }) => {
  const pathname = usePathname();
  return (
    <>
      <div className="mb-4 flex h-10 w-auto min-w-0 max-w-min items-center overflow-x-auto rounded-md bg-muted p-1 text-muted-foreground">
        {links.map((link) => (
          <Link
            replace
            key={link.label}
            href={link.href}
            data-state={pathname === link.href ? "active" : "inactive"}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-main-500  data-[state=active]:text-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-main-900"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export { TabsLink };
