import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";

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

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credential) {
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
} satisfies NextAuthConfig;
