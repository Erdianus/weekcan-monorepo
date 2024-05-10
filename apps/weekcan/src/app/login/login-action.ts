/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use server";

import { signIn } from "@hktekno/auth";

export async function loginAction(
  formdata: FormData,
): Promise<{ status: boolean; message: string }> {
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
  } catch (e) {
    return {
      status: false,
      // @ts-expect-error gapapa gan error
      message: `${e.cause?.err?.message ?? "Gagal Login"}`,
    };
  }
}
