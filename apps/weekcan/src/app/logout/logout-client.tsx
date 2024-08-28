/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { useEffect } from "react";

import Spinner from "@hktekno/ui/components/ui/spinner";

export default function LogoutClient() {
  useEffect(() => {
    // @ts-expect-error gapapa error gan
    document.querySelector("#btnSubmit")?.click();
  }, []);
  return (
    <>
      <Spinner className="h-10 w-10" />
    </>
  );
}
