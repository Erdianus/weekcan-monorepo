import type { PropsWithChildren } from "react";

import { auth } from "@hktekno/auth";

import Logo from "./logo";
import { SidebarItems } from "./sidebar-clients";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Muted } from "./ui/typograhpy";

const SidebarList = async () => {
  const sesh = await auth();
  return (
    <>
      <div className="overflow-y-auto p-0 py-5 sm:h-full sm:px-3">
        <ul className="space-y-2">
          <SidebarItems text="Dashboard" link="/dashboard" icon={"dashboard"} />
          <SidebarItems text="Proyek/Event" link="/project" icon={"project"} />
          {["Admin", "Owner"].includes(sesh?.user.role ?? "") && (
            <>
              <Muted>Master Data</Muted>
              <SidebarItems text="User" link="/user" icon={"user"} />
              <SidebarItems
                text="Perusahaan"
                link="/company"
                icon={"company"}
              />
              <SidebarItems text="Tempat Acara" link="/venue" icon={"venue"} />
              <SidebarItems text="Klien" link="/client" icon={"client"} />
              <SidebarItems text="Jabatan" link="/job_type" icon={"jobType"} />
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export function SidebarDrawer({ children }: PropsWithChildren) {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <a href="/" className="mr-4 flex items-center gap-2">
            <Logo
              className="mr-3 h-6 text-black dark:text-white sm:h-9"
              height={36}
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              weekcan
            </span>
          </a>
        </SheetHeader>
        <SidebarList />
      </SheetContent>
    </Sheet>
  );
}

export default function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r-0 border-gray-200 pt-14 transition-transform dark:border-gray-700 md:translate-x-0"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <SidebarList />
    </aside>
  );
}
