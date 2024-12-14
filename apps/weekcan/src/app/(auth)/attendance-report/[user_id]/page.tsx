import { Metadata } from "next";

import Report from "./report";

export const metadata: Metadata = {
  title: 'Detail Kehadiran'
};

export default function Page({ params }: { params: { user_id: string } }) {
  return (
    <>
      <Report user_id={params.user_id} />
    </>
  );
}
