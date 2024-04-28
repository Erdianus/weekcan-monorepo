import { auth } from "@repo/auth";
import Navbar from "@repo/ui/components/navbar";
import Sidebar from "@repo/ui/components/sidebar";
import AlertConfirm from "@repo/ui/components/alert-confirm";
import InitAxios from "@repo/ui/components/init-axios";
import QueryProvider from "@repo/api/provider";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import axios from "axios";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const sesh = await auth();

  if (!sesh) {
    redirect("/login");
  }

  try {
    const res = await axios(`${process.env.BASE_API}/api/checkLogin`, {
      headers: {
        Authorization: `Bearer ${sesh.user.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      await axios.post('/api/auth/signout');
      redirect("/login");
    }
  } catch (e) {
    await axios.post('/api/auth/signout');
    redirect("/login");
  }

  return (
    <>
      <InitAxios user={sesh.user} />
      <QueryProvider>
        <AlertConfirm />
        <div className="antialiased">
          <Navbar />
          {/* <!-- Sidebar --> */}
          <Sidebar />
          <main className="p-4 md:ml-64 mr-4 min-h-svh pt-20">{children}</main>
        </div>
      </QueryProvider>
    </>
  );
}
