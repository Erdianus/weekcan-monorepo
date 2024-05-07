import type { PropsWithChildren } from "react";

import SingleTaskProject from "./single";

export default function Layout({
  params,
  children,
}: { params: { task_id: string } } & PropsWithChildren) {
  return (
    <>
      <SingleTaskProject id={params.task_id} />
      {children}
    </>
  );
}
