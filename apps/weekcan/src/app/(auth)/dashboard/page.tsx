import type { Metadata } from "next";

import { auth } from "@hktekno/auth";
import { Separator } from "@hktekno/ui/components/ui/separator";
import { Muted } from "@hktekno/ui/components/ui/typograhpy";

import ListCompany from "./list-company";

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
    </>
  );
}
