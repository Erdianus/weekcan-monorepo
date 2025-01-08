import { Menu } from "lucide-react";

import CopyToken from "./clipboard";
import Logo from "./logo";
import { SidebarDrawer } from "./sidebar";
import { ModeToggle } from "./theme-toggle";
import { SidebarTrigger } from "./ui/sidebar";
import UserMenu from "./user-menu";

export default function Navbar() {
  return (
    <nav className="bg-background/90 supports-[backdrop-filter]:bg-background/80 z-50 border-b border-gray-200 px-4 py-2.5 backdrop-blur dark:border-gray-700">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-1 items-center justify-start">
          <SidebarDrawer>
            <Menu className="mr-2 md:hidden" />
          </SidebarDrawer>
          <SidebarTrigger className="mr-2" />
          <div id="portal-search" />
        </div>
        <div className="flex items-center gap-2 lg:order-2">
          {process.env.NODE_ENV === "development" && <CopyToken />}
          <ModeToggle />
          <UserMenu />
          {/* <!-- Dropdown menu --> */}
        </div>
      </div>
    </nav>
  );
}
