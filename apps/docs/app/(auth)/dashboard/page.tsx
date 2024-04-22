import { auth } from "@repo/auth";

export default async function DashboardPage() {
  const session = await auth();
  return <div>{session?.user.name}</div>;
}
