/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axios from "axios";

import { env } from "../env";
import { auth, signOut } from "./index";

export async function logoutAction() {
  const sesh = await auth();
  try {
    const res = await axios.post(
      `${env.NEXT_PUBLIC_BASE_API}/api/logout`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${sesh?.user.token}`,
          Accept: "application/json",
        },
      },
    );
    if (res.status === 200) await signOut({ redirect: false });

    return {
      status: true,
      message: "Berhasil Logout",
    };
  } catch (e: any) {
    console.log(e);
    return {
      status: false,
      message: `Gagal Logout`,
    };
  }
}
