import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@hktekno/ui/components/ui/button";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import { ListVendor } from "./list";

export const metadata: Metadata = {
  title: "Vendor",
};

export default function Page() {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <H3>Vendor</H3>
        <Button size={"icon"} asChild>
          <Link href="vendor/create">
            <Plus />
          </Link>
        </Button>
      </div>
      <ListVendor />
    </>
  );
}
