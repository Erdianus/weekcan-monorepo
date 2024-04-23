import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

type UserSession = {
  id: string;
  name: string | null | undefined;
  username: string;
  role: string;
  // company: Array<Company>;
  role_id: number;
  token: string;
};

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: UserSession;
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credential: { username: string; password: string }) {
        try {
          const res = await axios.post<{ data: UserSession }>(
            `${process.env.BASE_API}/api/login`,
            {
              username: credential.username,
              password: credential.password,
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
    // @ts-ignore
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    // @ts-ignore
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
} satisfies NextAuthConfig;
