"use client";

import type { PropsWithChildren } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressProviders = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#0ea5e9"
        options={{ showSpinner: true }}
      />
    </>
  );
};

export { ProgressProviders };
