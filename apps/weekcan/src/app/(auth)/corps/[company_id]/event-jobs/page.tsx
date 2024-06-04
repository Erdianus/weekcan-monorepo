import { Separator } from "@hktekno/ui/components/ui/separator";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import Filter from "./filter";
import ListCompanyTask from "./list";

export default function ListCompanyTaskPage({
  params,
}: {
  params: { company_id: string };
}) {
  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <H3>Tugas</H3>
      </div>
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          Filter
          <Separator className="flex-1" />
        </div>
        <div className="flex flex-wrap gap-4">
          <Filter />
        </div>
      </div>
      <ListCompanyTask company_id={params.company_id} />
    </>
  );
}
