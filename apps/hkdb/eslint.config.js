import baseConfig from "@hktekno/eslint-config/base";
import reactConfig from "@hktekno/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  ...reactConfig,
  {
    ignores: ["server.js", "!**/.server", "!**/.client", "vite.config.ts"],
  },
  // { extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"] },
];
