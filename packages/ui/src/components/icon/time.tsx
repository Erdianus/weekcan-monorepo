"use client";

import type { SVGProps } from "react";
import React from "react";
import dayjs from "dayjs";

export default function Time(props: SVGProps<SVGSVGElement>) {
  const time = dayjs().format("HH");
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {time === "08" && (
        <>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 8 14" />
        </>
      )}
      {time === "09" && (
        <>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 7.5 12" />
        </>
      )}
      {time === "10" && (
        <>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 8 10" />
        </>
      )}
      {time === "11" && (
        <>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 9.5 8" />
        </>
      )}
      {time === "12" && (
        <>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12" />
        </>
      )}
      {time === "13" && (
        <>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 14.5 8" />
        </>
      )}
      {time === "14" && (
        <>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 10" />
        </>
      )}
      {time === "15" && (
        <>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16.5 12" />
        </>
      )}
      {time === "16" && (
        <>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </>
      )}
      {time === "17" && (
        <>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 14.5 16" />
        </>
      )}
    </svg>
  );
}
