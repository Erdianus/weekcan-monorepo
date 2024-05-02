"use server";

import { auth, signOut } from "./index";
import  axios  from "axios";

export async function logoutAction() {
  const sesh = await auth();
  try {
    const res = await axios.post(
      `${process.env.BASE_API}/api/logout`,
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
    return {
      status: false,
      message: `Gagal Logout`,
    };
  }
}
