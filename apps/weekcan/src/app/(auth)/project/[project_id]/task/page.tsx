import ListTaskProject from "./list";

export default function TaskProjectPage({
  params,
}: {
  params: { project_id: string };
}) {
  return (
    <>
      <ListTaskProject project_id={params.project_id} />
    </>
  );
}
