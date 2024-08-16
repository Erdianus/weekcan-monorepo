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
  role_id: string;
  token: string;
  friends_id?: number;
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

          const { data: u } = await Axios<{
            data: { company: { id: number; company_name: string }[] };
          }>(`/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          let friends_id: undefined | number;
          u.data.company.some((v) => {
            const vv = v.company_name === "Friends Production";
            if (vv) {
              friends_id = v.id;
            }
            return vv;
          });

          return { ...user, friends_id };
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
