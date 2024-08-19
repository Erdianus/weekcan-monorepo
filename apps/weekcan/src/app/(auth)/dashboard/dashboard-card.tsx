"use client";

import Link from "next/link";
import dayjs from "dayjs";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";

import { k } from "@hktekno/api";
import RotateBetween from "@hktekno/ui/components/ui/rotate-between";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";

export default function DashboardCard() {
  const { data: dashboard } = k.dashboard.all.useQuery();
  console.log(dashboard);
  const month = dayjs().locale("id").format("MMMM");
  return (
    <>
      <div className="mt-4">
        <div className="mb-4 flex items-center justify-between">
          <H3 className="flex items-center gap-2">
            <span>Proyek</span> <RotateBetween words={["Bulan Ini", month]} />{" "}
          </H3>
          <Link
            className="text-sm text-muted-foreground hover:underline"
            href="/project"
          >
            Lihat Selengkapnya
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Link
          className="flex items-center gap-4 rounded-lg border bg-green-500 p-2 text-green-50 transition hover:scale-105 dark:border-green-500 dark:bg-green-950 dark:text-green-500"
          href="/project?progress=Done"
        >
          <CheckCircle size={48} />
          <div>
            <p className="text-xl font-bold">Done</p>
            <div className="text-lg font-bold">
              {dashboard?.project.done ?? <Skeleton className="h-8 w-8" />}
            </div>
          </div>
        </Link>
        <Link
          className="flex items-center gap-4 rounded-lg border border-yellow-500 bg-yellow-500 p-2 text-yellow-50 transition hover:scale-105 dark:border-yellow-500 dark:bg-yellow-950 dark:text-yellow-500"
          href="/project?progress=On Going"
        >
          <Loader size={48} />
          <div>
            <p className="text-xl font-bold">On Going</p>
            <div className="text-lg font-bold">
              {dashboard?.project.onGoing ?? <Skeleton className="h-8 w-8" />}
            </div>
          </div>
        </Link>
        <Link
          className="flex items-center gap-4 rounded-lg border border-orange-500 bg-orange-500 p-2 text-orange-50 transition hover:scale-105 dark:border-orange-500 dark:bg-orange-950 dark:text-orange-500"
          href="/project?progress=Pending"
        >
          <AlertCircle size={48} />
          <div>
            <p className="text-xl font-bold">Pending</p>
            <div className="text-lg font-bold">
              {dashboard?.project.pending ?? <Skeleton className="h-8 w-8" />}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
