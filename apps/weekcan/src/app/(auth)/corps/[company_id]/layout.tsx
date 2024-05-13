import type { PropsWithChildren } from "react";

import SingleCorps from "./single";

export default function Layout({
  params,
  children,
}: PropsWithChildren & { params: { company_id: string } }) {
  return (
    <>
      <SingleCorps id={params.company_id} />
      {children}
    </>
  );
}
