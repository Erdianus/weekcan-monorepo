"use client";

import type { PropsWithChildren } from "react";

export function RoleAuth({
  roles,
  role,
  children,
}: { roles?: string[]; role?: string } & PropsWithChildren) {
  if (role && roles?.includes(role)) return <>{children}</>;

  if (role && roles && !roles.includes(role)) return null;

  return children;
}
