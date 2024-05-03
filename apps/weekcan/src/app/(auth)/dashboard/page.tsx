import type { Metadata } from "next";

import { auth } from "@hktekno/auth";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();
  return (
    <div className="flex w-full items-center justify-center">
      <h1 className="text-3xl font-bold">
        Selamat Datang {session?.user.name}
      </h1>
    </div>
  );
}
