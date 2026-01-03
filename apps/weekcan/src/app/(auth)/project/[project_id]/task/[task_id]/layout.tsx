import type { PropsWithChildren } from "react";

import SingleTaskProject from "./single";

export default async function Layout({
  params,
  children,
}: { params: Promise<{ task_id: string }> } & PropsWithChildren) {
  const { task_id } = await params;

  return (
    <>
      <SingleTaskProject id={task_id} />
      {children}
    </>
  );
}
