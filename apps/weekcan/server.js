/* eslint-disable no-restricted-properties */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { createServer } from "http";
import { parse } from "url";
import next from "next";

const port = parseInt("3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, port, hostname: "localhost" });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port);
  console.log(
    `> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV}`,
  );
});
