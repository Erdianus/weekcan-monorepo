import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@hktekno/ui/components/ui/button";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import ListDailyJobUser from "./list";

export const metadata: Metadata = {
  title: "Tugas Harian",
};

export default function Page() {
  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">Tugas Harian</H3>
        <Button type="button" size={"icon"} asChild>
          <Link href={`/friends/daily-job/create`}>
            <Plus />
          </Link>
        </Button>
      </div>
      <ListDailyJobUser />
    </>
  );
}
