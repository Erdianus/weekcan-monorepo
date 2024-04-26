import { promises as fs } from "fs";
import { type NextRequest } from "next/server";

export async function province_get(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search");
  const json = await fs.readFile(
    process.cwd() + "/app/assets/json/province.json",
    "utf8",
  );

  const parsedJson = JSON.parse(json) as { id: string; name: string }[];
  const data = search
    ? parsedJson.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase()),
      )
    : parsedJson;

  return Response.json(
    { data },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",

        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      },
    },
  );
}
