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
    await axios.post("/api/auth/signout");
    redirect("/login");
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
          <main className="min-h-svh p-4 pt-20 md:ml-64">{children}</main>
        </div>
      </QueryProvider>
    </>
  );
}
