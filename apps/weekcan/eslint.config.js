import baseConfig, { restrictEnvAccess } from "@hktekno/eslint-config/base";
import nextjsConfig from "@hktekno/eslint-config/nextjs";
import reactConfig from "@hktekno/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
