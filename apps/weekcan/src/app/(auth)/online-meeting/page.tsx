import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@hktekno/ui/components/ui/button";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";

export default function Page() {
  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <H3>Online Meeting</H3>
        <div className="flex items-center gap-4">
          <Button size={"icon"} asChild>
            <Link href="online-meeting/create">
              <Plus />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
