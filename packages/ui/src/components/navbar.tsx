"use client";

import { Menu } from "lucide-react";

import CopyToken from "./clipboard";
import Logo from "./logo";
import { SidebarDrawer } from "./sidebar";
import { ModeToggle } from "./theme-toggle";
import UserMenu from "./user-menu";

export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-background px-4 py-2.5 dark:border-gray-700">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-1 items-center justify-start">
          <SidebarDrawer>
            <Menu className="mr-2 md:hidden" />
          </SidebarDrawer>
          <a
            href="/"
            className="mr-4 hidden items-center justify-between sm:flex"
          >
            <Logo
              className="mr-3 h-6 text-black dark:text-white sm:h-9"
              height={36}
            />
            <span className="hidden self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:block">
              weekcan
            </span>
          </a>
          <div id="portal-search" />
        </div>
        <div className="flex items-center gap-2 lg:order-2">
          <CopyToken />
          <ModeToggle />
          <UserMenu />

          {/* <!-- Dropdown menu --> */}
        </div>
      </div>
    </nav>
  );
}
