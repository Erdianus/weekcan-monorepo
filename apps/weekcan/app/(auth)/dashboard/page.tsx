import { auth } from "@repo/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const session = await auth();
  return (
    <div className="flex items-center w-full justify-center">
      <h1 className="text-3xl font-bold">
        Selamat Datang {session?.user.name}
      </h1>
    </div>
  );
}
