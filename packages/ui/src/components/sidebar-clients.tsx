"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "../lib/utils";
import {
  Client,
  Company,
  Dashboard,
  JobType,
  Project,
  Time,
  User,
  Venue,
} from "./icon";

const icons = Object.freeze({
  dashboard: Dashboard,
  project: Project,
  attendances: Time,
  user: User,
  company: Company,
  venue: Venue,
  client: Client,
  jobType: JobType,
});

type Icon = keyof typeof icons;

type SidebarItemProps = {
  link: string;
  text: string;
  icon: Icon;
};

const SidebarItems = (props: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === props.link;
  const Icons = icons[props.icon];
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
        <Icons
          aria-hidden="true"
          className={cn("h-6 w-6")}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        />

        <span className="ml-3">{props.text}</span>
      </Link>
    </li>
  );
};

export { SidebarItems };
