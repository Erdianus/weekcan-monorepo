import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@hktekno/ui/components/ui/button";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import ListAbsent from "./list";

export const metadata: Metadata = {
  title: "Izin",
};

export default function Page() {
  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">Izin</H3>
        <Button type="button" size={"icon"} asChild>
          <Link href={"absent/create"}>
            <Plus />
          </Link>
        </Button>
      </div>
      <ListAbsent />
    </>
  );
}
