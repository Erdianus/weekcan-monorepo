import type { ReactNode } from "react";

import SingleProject from "./single";

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { project_id: string | number };
}) {
  return (
    <>
      <SingleProject id={params.project_id} />
      {children}
    </>
  );
}
