"use client";
import { LogOut } from "lucide-react";
import { Input } from "./ui/input";
import Link from "next/link";
import { SVGProps } from "react";
import { Dashboard, Project } from "./icon";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@ui/lib/utils";
import { logoutAction } from "@ui/pages/auth/logout-action";
import { toast } from "sonner";
import ButtonSubmit from "./ui/button-submit";

type SidebarItemProps = {
  link: string;
  text: string;
  // eslint-disable-next-line no-unused-vars
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
          "flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
          isActive && "dark:bg-main-500 dark:text-white",
        )}
      >
        <props.icon
          aria-hidden="true"
          className={cn(
            "w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white",
            isActive && "dark:text-white",
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        />

        <span className="ml-3">{props.text}</span>
      </Link>
    </li>
  );
};

export default function Sidebar() {
  const router = useRouter();
  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-primary dark:border-gray-700"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-primary">
        <form action="#" method="GET" className="md:hidden mb-2">
          <label className="sr-only">Search</label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                ></path>
              </svg>
            </div>
            <Input />
          </div>
        </form>
        <ul className="space-y-2">
          <SidebarItems text="Dashboard" link="/dashboard" icon={Dashboard} />
          <SidebarItems text="Project" link="/project" icon={Project} />
        </ul>
      </div>
      <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-primary z-20">
        <form
          action={async () => {
            const res = await logoutAction();
            if (!res.status) {
              toast.error(res.message);
              return;
            }

            toast.success(res.message);
            router.push("/push");
          }}
        >
          <ButtonSubmit variant={"ghost"} size={"icon"}>
            <LogOut />
          </ButtonSubmit>
        </form>
      </div>
    </aside>
  );
}
