import { fileURLToPath } from "url";
import withPWAInit from "@ducanh2912/next-pwa";
import createJiti from "jiti";

createJiti(fileURLToPath(import.meta.url))("./src/env");

const withPWA = withPWAInit({
  disable: process.env.NODE_ENV === "development",
  dest: "public",
});

/** @type {import("next").NextConfig} */
const config = {
  turbopack: false, // ⬅️ WAJIB
  reactStrictMode: true,

  transpilePackages: [
    "@hktekno/api",
    "@hktekno/auth",
    "@hktekno/ui",
    "@hktekno/utils",
  ],

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default withPWA(config);
