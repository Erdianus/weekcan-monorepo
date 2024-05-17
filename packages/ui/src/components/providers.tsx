"use client";

import type { PropsWithChildren } from "react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { refetchInterval: 60000 } },
    }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
