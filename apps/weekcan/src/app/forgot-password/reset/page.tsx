import type { Metadata } from "next";
import { redirect } from "next/navigation";
import axios, { AxiosError } from "axios";

import { env } from "~/env";
import ResetPassword from "./reset-password";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { email: string; reset_token: string };
}) {
  try {
    await axios(`${env.NEXT_PUBLIC_BASE_API}/api/reset-pass`, {
      params: searchParams,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      redirect("/login");
    }
    throw "Terjadi Kesalahan";
  }

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <ResetPassword />
      </div>
    </>
  );
}
