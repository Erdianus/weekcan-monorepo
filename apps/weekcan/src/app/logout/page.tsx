import { redirect } from "next/navigation";

import { auth, signOut } from "@hktekno/auth";
import ButtonSubmit from "@hktekno/ui/components/ui/button-submit";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@hktekno/ui/components/ui/card";

import { env } from "~/env";

export default async function Page() {
  const sesh = await auth();
  const res = await fetch(`${env.NEXT_PUBLIC_BASE_API}/api/checkLogin`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sesh?.user.token}`,
    },
  });

  if (!sesh || res.ok) {
    redirect("/");
  }

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center px-2 md:px-0">
        <div>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Terjadi Kesalahan</CardTitle>
              <CardDescription>
                Coba untuk logout dulu dengan menekan tombol dibawah
              </CardDescription>
            </CardHeader>
            <form
              action={async () => {
                "use server";
                const res = await signOut();
                console.log(res);
                redirect("/login");
              }}
              className="space-y-4"
              method="post"
            >
              <CardFooter>
                <ButtonSubmit>Logout</ButtonSubmit>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
