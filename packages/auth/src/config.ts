import type { DefaultSession, NextAuthConfig } from "next-auth";
import { AxiosError } from "axios";
import Credentials from "next-auth/providers/credentials";

import Axios from "@hktekno/utils/axios";

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
          const res = await Axios.post<{ data: UserSession }>(
            `/login`,
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

          return user;
        } catch (e: unknown) {
          if (e instanceof AxiosError) {
            throw new Error(e.message);
          }
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
