import { auth, signOut } from "@repo/auth";
import Navbar from "@repo/ui/components/navbar";
import Sidebar from "@repo/ui/components/sidebar";
import InitAxios from "@repo/ui/components/init-axios";
import QueryProvider from '@repo/api/provider'
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
      await signOut({redirect: false})
      redirect("/login");
    }
  } catch (e) {
    console.log(e);
    await signOut({redirect: false})
    redirect("/login");
  }

  return (
    <>
      <InitAxios token={sesh.user.token} />
      <QueryProvider>
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
