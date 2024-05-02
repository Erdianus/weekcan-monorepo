import type { DefaultSession, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

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
    user: UserSession & DefaultSession['user'];
  }
}

export const authConfig = {
  providers: [
    Credentials({
      authorize: async(credentials: Partial<Record<"username" | "password", unknown>>) => {
        try {
          const res = await axios.post<{ data: UserSession }>(
            `${process.env.BASE_API}/api/login`,
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

          if (!user) throw new Error("Akun Tidak Ditemukan");

          return user;
        } catch (e: unknown) {
          return null;
        }
      },
    }),
  ],
  secret: "nCD9KYO42/6NESGwYuW6zPjYGPLJwFqC/LoKDTfWsCEW",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      return {...session, user: token};
    },
  },
} satisfies NextAuthConfig;
