import type { Metadata } from "next";
import Link from "next/link";

import { auth } from "@hktekno/auth";
import { Separator } from "@hktekno/ui/components/ui/separator";
import { Muted } from "@hktekno/ui/components/ui/typograhpy";

import HelloUser from "./helo";
import { CarouselCompany } from "./list-company";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const sesh = await auth();
  return (
    <>
      {sesh && <HelloUser id={sesh.user.id} />}
      <div className="mb-1 mt-4 flex items-center gap-1">
        <Muted>Perusahaan</Muted>
        <Separator className="flex-1" />
      </div>
      <CarouselCompany user_id={sesh?.user.id ?? ""} />
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
    </>
  );
}
