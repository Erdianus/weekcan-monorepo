import type { Metadata } from "next";
import ListTaskProject from "./list";

export const metadata: Metadata = {
  title: "Perihal",
};

export default async function Page({
  params,
}: {
  params: Promise<{ task_id: string }>;
}) {
  const { task_id } = await params;
  return (
    <>
      <ListTaskProject id={task_id} />
    </>
  );
}
