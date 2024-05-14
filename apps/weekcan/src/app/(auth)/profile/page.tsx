import type { Metadata } from "next";

import { auth } from "@hktekno/auth";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";

import Profile from "./profile";

export const metadata: Metadata = {
  title: "Profil",
};

export default async function ProfilePage() {
  const sesh = await auth();
  return (
    <>
      <H3 className="mb-4">Profile</H3>
      <Profile id={`${sesh?.user.id}`} />
    </>
  );
}
