import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@hktekno/auth";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const sesh = await auth();
  if (sesh) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-2 md:px-0">
      <div>
        <LoginForm />
        <Link
          href={"/forgot-password"}
          className="mt-1 text-sm text-main-500 hover:text-main-600 hover:underline"
        >
          Lupa Password?
        </Link>
      </div>
    </div>
  );
}
