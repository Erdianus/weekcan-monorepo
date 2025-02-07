/* eslint-disable no-restricted-properties */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_BASE_API: z.string(),
    NEXT_PUBLIC_FINANCE_API: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_API: process.env.NEXT_PUBLIC_BASE_API,
    NEXT_PUBLIC_FINANCE_API: process.env.NEXT_PUBLIC_FINANCE_API,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
