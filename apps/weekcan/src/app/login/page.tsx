import { redirect } from "next/navigation";

import { auth } from "@hktekno/auth";

import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const sesh = await auth();
  if (sesh) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoginForm />
    </div>
  );
}
