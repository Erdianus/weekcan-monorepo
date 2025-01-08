import Link from "next/link";
import {
  Building2,
  Code2,
  Fingerprint,
  HeartHandshake,
  MapPin,
  Package,
  UserRoundCog,
  Users,
  Warehouse,
} from "lucide-react";

import { auth } from "@hktekno/auth";

import Logo from "../logo";
import { RoleAuth } from "../role";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./sidebar";

// This is sample data.
const data = {
  friends: {
    title: "Friends Productions",
    menus: [
      {
        icon: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2V5a2 2 0 0 0-2-2h-1V1m-7.12 11H7.27l2.92 2.11l-1.11 3.45L12 15.43l2.92 2.13l-1.12-3.44L16.72 12h-3.6L12 8.56z"></path>
          </svg>
        ),
        link: "/friends/event",
        title: "Event",
      },
      {
        icon: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="-2 -2 24 24"
          >
            <path
              fill="currentColor"
              d="M6 0h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6m0 2a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4zm6 7h3a1 1 0 0 1 0 2h-3a1 1 0 0 1 0-2m-2 4h5a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2m0-8h5a1 1 0 0 1 0 2h-5a1 1 0 1 1 0-2m-4.172 5.243L7.95 8.12a1 1 0 1 1 1.414 1.415l-2.828 2.828a1 1 0 0 1-1.415 0L3.707 10.95a1 1 0 0 1 1.414-1.414z"
            ></path>
          </svg>
        ),
        link: "/friends/daily-job",
        title: "Kerjaan Harian",
      },
    ],
  },
  company: {
    title: "HK Tekno & VW",
    menus: [{ icon: Code2, link: "/project", title: "Project" }],
  },
  absensi: {
    title: "Absensi",
    menus: [
      { icon: Fingerprint, link: "/attendance", title: "Kehadiran" },
      {
        icon: UserRoundCog,
        link: "/attendance-report",
        title: "Laporan",
        roles: ["Admin", "Owner", "HRD"],
      },
    ],
  },
  inventaris: {
    title: "Inventaris",
    menus: [
      {
        icon: Package,
        link: "/inventory/item",
        title: "Barang",
      },
      {
        icon: Warehouse,
        link: "/inventory/warehouse",
        title: "Gudang",
      },
    ],
  },
  master: {
    title: "Master Data",
    menus: [
      {
        icon: Users,
        link: "/user",
        title: "Users",
      },
      {
        icon: Building2,
        link: "/company",
        title: "Perusahaan",
      },
      {
        icon: MapPin,
        link: "/venue",
        title: "Venue",
      },
      {
        icon: HeartHandshake,
        link: "/client",
        title: "Client",
      },
      {
        icon: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-id-card"
          >
            <path d="M16 10h2" />
            <path d="M16 14h2" />
            <path d="M6.17 15a3 3 0 0 1 5.66 0" />
            <circle cx="9" cy="11" r="2" />
            <rect x="2" y="5" width="20" height="14" rx="2" />
          </svg>
        ),
        link: "/job_type",
        title: "Jabatan",
      },
    ],
  },
};

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const sesh = await auth();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          asChild
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link href={"/dashboard"}>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Logo className="size-6 text-white  dark:text-black" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">weekcan</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="space-y-1">
          <SidebarGroupLabel>{data.friends.title}</SidebarGroupLabel>
          {data.friends.menus.map((menu) => (
            <SidebarMenu key={menu.link}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={menu.title}
                  link={menu.link}
                >
                  <Link href={menu.link}>
                    <menu.icon />
                    <span>{menu.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          ))}
        </SidebarGroup>

        <SidebarGroup className="space-y-1">
          <SidebarGroupLabel>{data.company.title}</SidebarGroupLabel>
          {data.company.menus.map((menu) => (
            <SidebarMenu key={menu.link}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={menu.title}
                  link={menu.link}
                >
                  <Link href={menu.link}>
                    <menu.icon />
                    <span>{menu.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          ))}
        </SidebarGroup>

        <SidebarGroup className="space-y-1">
          <SidebarGroupLabel>{data.absensi.title}</SidebarGroupLabel>
          {data.absensi.menus.map((menu) => (
            <RoleAuth key={menu.link} roles={menu.roles} role={sesh?.user.role}>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip={menu.title}
                    link={menu.link}
                  >
                    <Link href={menu.link}>
                      <menu.icon />
                      <span>{menu.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </RoleAuth>
          ))}
        </SidebarGroup>

        <RoleAuth roles={["Admin", "Owner", "Manager"]} role={sesh?.user.role}>
          <SidebarGroup className="space-y-1">
            <SidebarGroupLabel>{data.inventaris.title}</SidebarGroupLabel>
            {data.inventaris.menus.map((menu) => (
              <SidebarMenu key={menu.link}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip={menu.title}
                    link={menu.link}
                  >
                    <Link href={menu.link}>
                      <menu.icon />
                      <span>{menu.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            ))}
          </SidebarGroup>
        </RoleAuth>

        <RoleAuth roles={["Admin", "Owner", "Manager"]} role={sesh?.user.role}>
          <SidebarGroup className="space-y-1">
            <SidebarGroupLabel>{data.master.title}</SidebarGroupLabel>
            {data.master.menus.map((menu) => (
              <SidebarMenu key={menu.link}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip={menu.title}
                    link={menu.link}
                  >
                    <Link href={menu.link}>
                      <menu.icon />
                      <span>{menu.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            ))}
          </SidebarGroup>
        </RoleAuth>

        {/* <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
