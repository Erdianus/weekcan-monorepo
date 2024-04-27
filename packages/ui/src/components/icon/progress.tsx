import type { SVGProps } from "react";

export default function Progress(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6V3m0 18v-2m7-7h2M3 12h3m11.657-5.657l.707-.707M5.636 18.364L7.05 16.95m9.9 0l1.414 1.414M5.636 5.636l2.121 2.121"
      ></path>
    </svg>
  );
}
