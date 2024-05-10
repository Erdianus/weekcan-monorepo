import ListTaskProject from "./list";

export default function Page({ params }: { params: { task_id: string } }) {
  return (
    <>
      <ListTaskProject id={params.task_id} />
    </>
  );
}
