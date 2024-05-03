import baseConfig from "@hktekno/eslint-config/base";
import reactConfig from "@hktekno/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];
