import type { Metadata } from "next";
import ListTaskProject from "./list";

export const metadata: Metadata = {
  title: 'Perihal',
}

export default function Page({ params }: { params: { task_id: string } }) {
  return (
    <>
      <ListTaskProject id={params.task_id} />
    </>
  );
}
