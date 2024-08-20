import type { Metadata } from "next";
import Link from "next/link";

import { auth } from "@hktekno/auth";

import DashboardCard from "./dashboard-card";
import HelloUser from "./helo";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const sesh = await auth();
  return (
    <>
      {sesh && <HelloUser id={sesh.user.id} />}

      {!!sesh?.user.friends_id && (
        <div className="my-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Link
            className="flex gap-4 rounded-lg border border-black bg-[#e7252d] p-2 transition hover:scale-105 "
            href={"/friends"}
          >
            <img src="/img/friends_logo.png" className="h-14 " />
            <p className="text-xl font-bold text-white">Friends Productions</p>
          </Link>
          <Link
            className="flex gap-4 rounded-lg border border-black bg-[#E3B420] p-2 transition hover:scale-105 "
            href={"/friends/event"}
          >
            <img src="/img/event_icon.png" className="h-14 " />
            <p className="text-xl font-bold text-white">Events Friends</p>
          </Link>
          <Link
            className="flex gap-4 rounded-lg border border-black bg-[#60B75A] p-2 transition hover:scale-105 "
            href={"/friends/daily-job"}
          >
            <img src="/img/daily_icon.png" className="h-14 " />
            <p className="text-xl font-bold text-white">Kerjaan Harian</p>
          </Link>
        </div>
      )}
      {(sesh?.user.role !== "Employee" || !sesh.user.friends_id) && (
        <DashboardCard />
      )}
    </>
  );
}
