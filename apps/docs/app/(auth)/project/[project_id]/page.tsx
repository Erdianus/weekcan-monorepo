import { Metadata } from "next";
import DetailProject from "./detail";

export const metadata: Metadata = {
  title: "Project Single",
};

export default function Page({
  params,
}: {
  params: { project_id: string | number };
}) {
  return (
    <>
      <DetailProject id={params.project_id} />
    </>
  );
}
