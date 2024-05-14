import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { auth } from "@hktekno/auth";
import { Button } from "@hktekno/ui/components/ui/button";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import ListProject from "./list";

export const metadata: Metadata = {
  title: "Proyek/Event",
};

export default async function ProjectPage() {
  const sesh = await auth();
  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">Proyek</H3>
        {sesh && ["Admin", "Owner", "Manager"].includes(sesh.user.role) && (
          <Button type="button" size={"icon"} asChild>
            <Link href={"project/create"}>
              <Plus />
            </Link>
          </Button>
        )}
      </div>
      <ListProject />
    </>
  );
}
