"use server";

import { signIn } from "@repo/auth";

export async function loginAction(formdata: FormData) {
  try {
     await signIn("credentials", {
      username: formdata.get("username"),
      password: formdata.get("password"),
      redirect: false,
    });
    return {
      status: true,
      message: "Berhasil Login",
    };
  } catch (e: any) {
    return {
      status: false,
      message: `Gagal Login`,
    };
  }
}
