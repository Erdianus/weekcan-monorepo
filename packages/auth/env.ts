/* eslint-disable no-restricted-properties */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH_SECRET: z.string().optional(),
    AUTH_TRUST_HOST: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_BASE_API: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_API: process.env.NEXT_PUBLIC_BASE_API,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
