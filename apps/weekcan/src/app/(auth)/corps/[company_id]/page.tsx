import DetailCompany from "./detail";

export default function Page({ params }: { params: { company_id: string } }) {
  return (
    <>
      <DetailCompany id={params.company_id} />
    </>
  );
}
