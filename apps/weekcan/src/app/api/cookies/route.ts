import { cookies } from "next/headers";

export const DELETE = () => {
  cookies().delete("authjs.callback-url");
  cookies().delete("authjs.csrf-token");
  cookies().delete("authjs.session-token");
  cookies().delete("authjs.callback-url");

  return Response.json({
    message: "Berhasil",
  });
};
