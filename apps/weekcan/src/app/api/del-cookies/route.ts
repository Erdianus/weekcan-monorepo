/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

export function POST() {
  try {
    cookies().delete("authjs.session-token");
    return Response.json({ message: "Berhasil" });
  } catch (e: any) {
    return Response.json(
      {
        message: e.message,
      },
      { status: 500 },
    );
  }
}
