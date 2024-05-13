import { H3 } from "@hktekno/ui/components/ui/typograhpy";

export default function ListCompanyTask({
  params,
}: {
  params: { company_id: string };
}) {
  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <H3>Tugas</H3>
      </div>
    </>
  );
}
