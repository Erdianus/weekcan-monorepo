import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

import { env } from "~/env";

export async function GET(): Promise<NextResponse> {
  const signout_page = await fetch(`${env.BASE_URL}/api/auth/signout`);

  const html = await signout_page.text();

  const $ = cheerio.load(html);

  const csrfToken = $("input[name=csrfToken]").val();

  return NextResponse.json({
    data: csrfToken,
  });
}
