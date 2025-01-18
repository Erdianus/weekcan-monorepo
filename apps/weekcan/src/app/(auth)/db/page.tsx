import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { auth } from "@hktekno/auth";
import { RoleAuth } from "@hktekno/ui/components/role";
import { Button } from "@hktekno/ui/components/ui/button";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import { ListTalent } from "./list";

export const metadata: Metadata = {
  title: "Database",
};

export default async function Page() {
  const sesh = await auth();
  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">Database</H3>
        <RoleAuth roles={["Admin", "Owner", "Manager"]} role={sesh?.user.role}>
          {" "}
          <Button type="button" size={"icon"} asChild>
            <Link href={"db/create"}>
              <Plus />
            </Link>
          </Button>
        </RoleAuth>
      </div>
      <ListTalent />
    </>
  );
}
