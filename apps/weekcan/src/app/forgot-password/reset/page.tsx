import { redirect } from "next/navigation";

import { env } from "~/env";
import ResetPassword from "./reset-password";

export default async function Page({
  searchParams,
}: {
  searchParams: { email: string; reset_token: string };
}) {
  const urlParams = new URLSearchParams(searchParams);
  urlParams.set("email", searchParams.email);
  urlParams.set("reset_token", searchParams.reset_token);

  const res = await fetch(
    `${env.NEXT_PUBLIC_BASE_API}/api/reset-pass?${urlParams.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  if (res.status !== 200) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <ResetPassword />
      </div>
    </>
  );
}
