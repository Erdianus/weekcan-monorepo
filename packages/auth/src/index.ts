import NextAuth from "next-auth";
import { useSession } from "next-auth/react";

import { UserSession, authConfig } from "./config";

export type { Session } from "next-auth";

const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);

export { GET, POST, auth, signIn, signOut, useSession, type UserSession };
