import type { Metadata } from "next";
import Link from "next/link";

import { auth } from "@hktekno/auth";
import { Separator } from "@hktekno/ui/components/ui/separator";
import { Muted } from "@hktekno/ui/components/ui/typograhpy";

import ListCompany from "./list-company";
import ListProject from "./list-project";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();
  return (
    <>
      <div className="mb-4 flex w-full items-center justify-center">
        <h1 className=" text-3xl font-bold">
          Selamat Datang {session?.user.name} 😆
        </h1>
      </div>
      <div className="mb-1 flex items-center gap-1">
        <Muted>Perusahaan</Muted>
        <Separator className="flex-1" />
      </div>
      <ListCompany />
      <div className="mb-3 mt-6 flex items-center gap-1">
        <Muted>Proyek</Muted>
        <Separator className="flex-1" />
        <Link
          className="text-sm text-main-500 hover:underline dark:text-main-600"
          href="/project"
        >
          Lihat Semua
        </Link>
      </div>
      <ListProject />
    </>
  );
}
