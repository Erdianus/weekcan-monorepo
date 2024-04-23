"use server";

import { signOut } from "@repo/auth";

export async function logoutAction() {
  try {
    await signOut({ redirect: false });
    return {
      status: true,
      message: "Berhasil Logout",
    };
  } catch (e: any) {
    return {
      status: false,
      message: `Gagal Logout`,
    };
  }
}
