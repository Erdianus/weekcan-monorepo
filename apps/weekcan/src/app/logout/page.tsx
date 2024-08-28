import { redirect } from "next/navigation";

import { auth, signOut } from "@hktekno/auth";
import ButtonSubmit from "@hktekno/ui/components/ui/button-submit";
import { H1 } from "@hktekno/ui/components/ui/typograhpy";

import { env } from "~/env";
import LogoutClient from "./logout-client";

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
        <form
          className="flex flex-col items-center justify-center"
          method="post"
          action={async () => {
            "use server";
            const res = await signOut();
            console.log(res);
            redirect("/login");
          }}
        >
          <LogoutClient />
          <H1>Bentar yaa</H1>
          <div>
            <span>Session kamu habis, jadi mau di</span>{" "}
            <span className="italic">redirect.</span>{" "}
            <span className="mx-1">Klik</span>
            <ButtonSubmit
              id="btnSubmit"
              className="inline-flex w-min p-0 text-main-500"
              variant={"link"}
            >
              disini
            </ButtonSubmit>{" "}
            kalau gak te-
            <i>redirect.</i>
          </div>
        </form>
      </div>
    </>
  );
}
