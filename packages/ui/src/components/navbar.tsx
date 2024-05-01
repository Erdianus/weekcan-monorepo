'use client';

import { Menu } from 'lucide-react';

import CopyToken from './clipboard';
import Logo from './logo';
import { SidebarDrawer } from './sidebar';

export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-background px-4 py-2.5 dark:border-gray-700">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-start">
          <SidebarDrawer>
            <Menu className="mr-2 md:hidden" />
          </SidebarDrawer>
          <a
            href="https://flowbite.com"
            className="mr-4 hidden items-center justify-between sm:flex"
          >
            <Logo className="mr-3 h-6 text-black dark:text-white sm:h-9" height={36} />
            <span className="hidden self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:block">
              weekcan
            </span>
          </a>
          <div id="portal-search" className="w-full" />
        </div>
        <div className="flex items-center lg:order-2">
          <CopyToken />
          <button
            type="button"
            className="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
              alt="user photo"
            />
          </button>
          {/* <!-- Dropdown menu --> */}
        </div>
      </div>
    </nav>
  );
}
