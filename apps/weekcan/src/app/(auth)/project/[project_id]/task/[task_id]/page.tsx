import DetailTaskProject from "./detail";

export default function Page({ params }: { params: { task_id: string } }) {
  return (
    <>
      <DetailTaskProject id={params.task_id} />
    </>
  );
}
