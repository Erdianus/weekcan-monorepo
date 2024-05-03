"use client";

import type { PropsWithChildren, SVGProps } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { logoutAction } from "@hktekno/auth/logout-action";

import { cn } from "../lib/utils";
import { Client, Company, Dashboard, Project, Venue } from "./icon";
import User from "./icon/user";
import Logo from "./logo";
import { ModeToggle } from "./theme-toggle";
import ButtonSubmit from "./ui/button-submit";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Muted } from "./ui/typograhpy";

type SidebarItemProps = {
  link: string;
  text: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

const SidebarItems = (props: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === props.link;
  return (
    <li>
      <Link
        href={props.link}
        className={cn(
          "group flex items-center rounded-lg p-2 text-base font-medium hover:bg-muted",
          isActive &&
            "bg-main-500 text-white hover:bg-main-600 dark:bg-main-900 dark:text-main-500 dark:hover:bg-main-950",
        )}
      >
        <props.icon
          aria-hidden="true"
          className={cn("h-6 w-6")}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        />

        <span className="ml-3">{props.text}</span>
      </Link>
    </li>
  );
};

const SidebarList = () => {
  const router = useRouter();
  return (
    <>
      <div className="overflow-y-auto p-0 py-5 sm:h-full sm:px-3">
        <ul className="space-y-2">
          <SidebarItems text="Dashboard" link="/dashboard" icon={Dashboard} />
          <SidebarItems text="Proyek/Event" link="/project" icon={Project} />
          <Muted>Master Data</Muted>
          <SidebarItems text="User" link="/user" icon={User} />
          <SidebarItems text="Perusahaan" link="/company" icon={Company} />
          <SidebarItems text="Tempat Acara" link="/venue" icon={Venue} />
          <SidebarItems text="Klien" link="/client" icon={Client} />
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 z-20 hidden w-full justify-center space-x-4 bg-background p-4 lg:flex">
        <form
          action={async () => {
            const res = await logoutAction();
            if (!res.status) {
              toast.error(res.message);
              return;
            }

            toast.success(res.message);
            router.push("/login");
          }}
        >
          <ButtonSubmit variant={"ghost"} size={"icon"}>
            <LogOut />
          </ButtonSubmit>
        </form>
        <ModeToggle />
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
