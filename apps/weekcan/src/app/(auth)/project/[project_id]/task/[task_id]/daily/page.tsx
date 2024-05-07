import DailyTaskProject from "./daily";

export default function Page({ params }: { params: { task_id: string } }) {
  return (
    <>
      <DailyTaskProject id={params.task_id} />
    </>
  );
}
