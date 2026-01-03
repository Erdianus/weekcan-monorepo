import DetailTaskProject from "./detail";

export default async function Page({
  params,
}: {
  params: Promise<{ task_id: string }>;
}) {
  const { task_id } = await params;

  return (
    <>
      <DetailTaskProject id={task_id} />
    </>
  );
}
