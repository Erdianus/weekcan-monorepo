import type { JSX, SVGProps } from "react";

const size = 24;
const Islam = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? size}
      height={props.height ?? size}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12.3 2H12A10 10 0 0 0 2 12a10 10 0 0 0 10 10c3 0 4.7-1 6.5-2.5C13 21 8 17 8 12s5-9 10.5-7.5A8.56 8.56 0 0 0 12.3 2m4.5 4.2l-1.5 3.5l-3.7.3l2.9 2.5l-.9 3.5l3.2-2l3.2 2l-1-3.5l3-2.5l-3.7-.3z"
      ></path>
    </svg>
  );
};

const Cross = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? size}
      height={props.height ?? size}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M10.5 2h3v6H19v3h-5.5v11h-3V11H5V8h5.5z"
      ></path>
    </svg>
  );
};

const Buddha = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? size}
      height={props.height ?? size}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11 2v1c-1.73.2-3.31.9-4.6 1.94l-.76-.76L4.22 5.6l.78.75A9.04 9.04 0 0 0 3 11H2v2h1c.21 1.68.9 3.26 2 4.56l-.78.76l1.42 1.42l.75-.74A9.3 9.3 0 0 0 11 21v1h2v-1a9.27 9.27 0 0 0 4.6-2l.76.74l1.42-1.42l-.78-.75c1.1-1.3 1.79-2.89 2-4.57h1v-2h-1a9 9 0 0 0-2-4.64l.78-.76l-1.42-1.42l-.75.76A9 9 0 0 0 13 3V2zm0 3v3l-1 .5l-2.19-2.15c.91-.68 2-1.18 3.19-1.35m2 0c1.16.18 2.26.64 3.2 1.35L14 8.5L13 8zM6.4 7.76L8.5 10L8 11H5c.16-1.16.7-2.3 1.39-3.25zm11.2 0c.73.95 1.21 2.06 1.4 3.24h-3l-.5-1l2.11-2.24zM12 10c1.12 0 2 .88 2 2s-.88 2-2 2s-2-.88-2-2s.88-2 2-2m-7 3h3l.57 1l-2.18 2.15C5.67 15.24 5.19 14.16 5 13m11 0h3a7 7 0 0 1-1.39 3.16L15.5 14zm-6 2.5l1 .5v3a7.04 7.04 0 0 1-3.2-1.43zm4 0l2.19 2.07c-.91.68-2 1.26-3.19 1.43v-3z"
      ></path>
    </svg>
  );
};

const Hindu = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? size}
      height={props.height ?? size}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m15 2l-1.5 1.5L15 5l1.5-1.5zm-4 1c-1 6 6 7 9 3l-2-1.5C17 6 13 8 11 3M9 7C7 7 4.5 8.5 4.5 8.5L6 11c1-1 3-1.5 4-1c2 1-1 3-3 2v3.5c3-1.5 5 .5 4 2C8 22 3 16 3 13c-2 6 3 9 6 9s5-2 3.5-7H14c-1.5 4.5 4 9 7 3c1-2 1-8.5-4-8.5c-4 0-3 5.5-6.5 4C14 10 12 7 9 7m10 5c3 3-4 9-4 3c0-2 2-4.5 4-3"
      ></path>
    </svg>
  );
};

const Konghucu = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? size}
      height={props.height ?? size}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a4 4 0 0 1-4-4a4 4 0 0 1 4-4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 2.5A1.5 1.5 0 0 1 13.5 8A1.5 1.5 0 0 1 12 9.5A1.5 1.5 0 0 1 10.5 8A1.5 1.5 0 0 1 12 6.5m0 8a1.5 1.5 0 0 0-1.5 1.5a1.5 1.5 0 0 0 1.5 1.5a1.5 1.5 0 0 0 1.5-1.5a1.5 1.5 0 0 0-1.5-1.5"
      ></path>
    </svg>
  );
};

const religionIcon: Record<
  string,
  (props: SVGProps<SVGSVGElement>) => JSX.Element
> = {
  Islam,
  Kristen: Cross,
  Katolik: Cross,
  Hindu,
  Buddha,
  Konghucu,
};

export { religionIcon };
