import type { DefaultSession, NextAuthConfig } from "next-auth";
import axios from "axios";
import Credentials from "next-auth/providers/credentials";

import { env } from "../env";

export type UserSession = {
  id: string;
  name: string | null | undefined;
  username: string;
  role: string;
  // company: Array<Company>;
  role_id: number;
  token: string;
};

declare module "next-auth" {
  interface Session {
    user: UserSession & DefaultSession["user"];
  }
}

export const authConfig = {
  trustHost: true,
  providers: [
    Credentials({
      authorize: async (
        credentials: Partial<Record<"username" | "password", unknown>>,
      ) => {
        try {
          const res = await axios.post<{ data: UserSession }>(
            `${env.NEXT_PUBLIC_BASE_API}/api/login`,
            {
              username: credentials.username,
              password: credentials.password,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            },
          );
          const { data: user } = res.data;

          console.log("Halo config auth");
          console.log(user);

          return user;
        } catch (e: unknown) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      return { ...session, user: token };
    },
  },
  secret: "nCD9KYO42/6NESGwYuW6zPjYGPLJwFqC/LoKDTfWsCEW",
} satisfies NextAuthConfig;
