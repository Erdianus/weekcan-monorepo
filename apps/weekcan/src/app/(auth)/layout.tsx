import type { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import axios from "axios";

import { auth } from "@hktekno/auth";
import AlertConfirm from "@hktekno/ui/components/alert-confirm";
import InitClient from "@hktekno/ui/components/init-client";
import Navbar from "@hktekno/ui/components/navbar";
import QueryProvider from "@hktekno/ui/components/providers";
import Sidebar from "@hktekno/ui/components/sidebar";

import { env } from "~/env";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const sesh = await auth();

  if (!sesh) {
    redirect("/login");
  }

  try {
    const res = await axios(`${env.NEXT_PUBLIC_BASE_API}/api/checkLogin`, {
      headers: {
        Authorization: `Bearer ${sesh.user.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      await axios.post("/api/auth/signout");
      redirect("/login");
    }
  } catch (e) {
    redirect("/api/auth/signout");
    const res = await fetch(`${env.BASE_URL}/api/auth/csrf`);
    const { csrfToken } = (await res.json()) as { csrfToken: string };
    console.log(`csrf: ${csrfToken}`);

    try {
      await axios.post(
        `${env.BASE_URL}/api/auth/signout`,
        {
          csrfToken,
        },
        {
          headers: {
            "CSRF-Token": csrfToken,
          },
        },
      );
      redirect("/login");
    } catch (e) {
      console.log(e);
      throw new Error("Error gan");
    }
  }
  return (
    <>
      <InitClient user={sesh.user} />
      <QueryProvider>
        <AlertConfirm />
        <div className="antialiased">
          <Navbar />
          {/* <!-- Sidebar --> */}
          <Sidebar />
          <main className="relative h-full min-h-lvh p-4 pt-20 md:ml-64 ">
            {children}
          </main>
        </div>
      </QueryProvider>
    </>
  );
}
