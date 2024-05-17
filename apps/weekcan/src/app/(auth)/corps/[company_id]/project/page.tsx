import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import ListProjectCompany from "./list";

export default function Page({ params }: { params: { company_id: string } }) {
  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">Proyek</H3>
      </div>
      <ListProjectCompany company_id={params.company_id} />
    </>
  );
}
