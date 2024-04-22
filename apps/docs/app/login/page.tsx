import { LoginForm } from "@repo/ui/pages/login/login-form";

export default async function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
