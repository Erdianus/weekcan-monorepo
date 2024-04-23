import { LoginForm } from "@repo/ui/pages/auth/login-form";
import { auth } from "@repo/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const sesh = await auth();
  if (sesh) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
