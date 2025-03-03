import Link from "next/link";
import {
  Building2,
  Code2,
  Fingerprint,
  HeartHandshake,
  MapPin,
  Package,
  Store,
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
  db: {
    title: "HKDB",
    menus: [
      {
        link: "/db",
        title: "Database",
        icon: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 21q-3.775 0-6.387-1.162T3 17V7q0-1.65 2.638-2.825T12 3t6.363 1.175T21 7v10q0 1.675-2.613 2.838T12 21m0-11.975q2.225 0 4.475-.638T19 7.025q-.275-.725-2.512-1.375T12 5q-2.275 0-4.462.638T5 7.025q.35.75 2.538 1.375T12 9.025M12 14q1.05 0 2.025-.1t1.863-.288t1.675-.462T19 12.525v-3q-.65.35-1.437.625t-1.675.463t-1.863.287T12 11t-2.05-.1t-1.888-.288T6.4 10.15T5 9.525v3q.625.35 1.4.625t1.663.463t1.887.287T12 14m0 5q1.15 0 2.338-.175t2.187-.462t1.675-.65t.8-.738v-2.45q-.65.35-1.437.625t-1.675.463t-1.863.287T12 16t-2.05-.1t-1.888-.288T6.4 15.15T5 14.525V17q.125.375.788.725t1.662.638t2.2.462T12 19"
            ></path>
          </svg>
        ),
      },
      {
        link: "/db/categories-skill",
        title: "Kategori & Keahlian ",
        icon: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6.5 11L12 2l5.5 9zm11 11q-1.875 0-3.187-1.312T13 17.5t1.313-3.187T17.5 13t3.188 1.313T22 17.5t-1.312 3.188T17.5 22M3 21.5v-8h8v8zM17.5 20q1.05 0 1.775-.725T20 17.5t-.725-1.775T17.5 15t-1.775.725T15 17.5t.725 1.775T17.5 20M5 19.5h4v-4H5zM10.05 9h3.9L12 5.85zm7.45 8.5"
            ></path>
          </svg>
        ),
      },
      {
        icon: Store,
        link: "/vendor",
        title: "Vendor",
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
      /* {
        link: "/online-meeting",
        title: "Online Meeting",
        icon: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2 10V8c0-.943 0-1.414.293-1.707S3.057 6 4 6h3c3.771 0 5.657 0 6.828 1.172S15 10.229 15 14v2c0 .943 0 1.414-.293 1.707S13.943 18 13 18h-3c-3.771 0-5.657 0-6.828-1.172S2 13.771 2 10m15.9-.93l.7-.675c1.45-1.398 2.174-2.097 2.787-1.844S22 7.803 22 9.8v4.4c0 1.997 0 2.996-.613 3.249s-1.338-.446-2.787-1.844l-.7-.675c-.888-.856-.9-.885-.9-2.107v-1.646c0-1.222.012-1.25.9-2.107"
              color="currentColor"
            ></path>
          </svg>
        ),
      }, */
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
        {sesh?.user.friends_id && (
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
        )}

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

        <RoleAuth roles={["Admin"]} role={sesh?.user.role}>
          <SidebarGroup className="space-y-1">
            <SidebarGroupLabel>{data.db.title}</SidebarGroupLabel>
            {data.db.menus.map((menu) => (
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
