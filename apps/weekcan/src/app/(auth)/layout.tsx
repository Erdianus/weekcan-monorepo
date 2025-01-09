import type { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import axios, { AxiosError } from "axios";

import { auth } from "@hktekno/auth";
import AlertConfirm from "@hktekno/ui/components/alert-confirm";
import InitClient from "@hktekno/ui/components/init-client";
import Navbar from "@hktekno/ui/components/navbar";
import { PWAConfirmInstall } from "@hktekno/ui/components/pwa-install";
import { AppSidebar } from "@hktekno/ui/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@hktekno/ui/components/ui/sidebar";

import { env } from "~/env";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const sesh = await auth();

  if (!sesh) {
    redirect("/login");
  }

  try {
    await axios(`${env.NEXT_PUBLIC_BASE_API}/api/checkLogin`, {
      headers: {
        Authorization: `Bearer ${sesh.user.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      if (e.status === 401) {
        // session cookie ada tapi server habis, hapus manual ke logout
        redirect("/logout");
      }
      // Kalau bukan lempar aja error, siapa tau 500
      throw Error(e.message);
    }

    // Sisanya gak tau error apa
    throw Error("Opps... Coba Refresh");
  }
  return (
    <>
      <InitClient user={sesh.user} />
      <AlertConfirm />
      <PWAConfirmInstall />
      <div className="antialiased">
        {/* <Navbar /> */}
        {/* <!-- Sidebar --> */}
        {/* <Sidebar /> */}
        <SidebarProvider className="">
          <AppSidebar />
          <SidebarInset className="flex h-full flex-col overflow-x-auto">
            <Navbar />
            <div className="relative flex-1 overflow-y-auto p-4">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </>
  );
}
