import NextAuth from "next-auth";
import { useSession } from "next-auth/react";

import type { UserSession } from "./config";
import { authConfig } from "./config";
import { logoutAction } from "./logout-action";

export type { Session } from "next-auth";

const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);

export {
  GET,
  POST,
  auth,
  signIn,
  signOut,
  useSession,
  type UserSession,
  logoutAction,
};
