import { fileURLToPath } from "url";
import withPWAInit from "@ducanh2912/next-pwa";
import createJiti from "jiti";

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env");

const withPWA = withPWAInit({
  dest: "public",
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@hktekno/api",
    "@hktekno/auth",
    "@hktekno/ui",
    "@hktekno/utils",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default withPWA(config);
