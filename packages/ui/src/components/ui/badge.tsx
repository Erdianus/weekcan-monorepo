import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@hktekno/ui/lib/utils";

const badgeVariants = cva<{ variant: Record<string, string> }>(
  "inline-flex items-center truncate rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        main: "border-transparent bg-main-500 text-white dark:bg-main-300 dark:text-main-700",
        default:
          "hover:bg-primary/80 border-transparent bg-primary text-primary-foreground",
        secondary:
          "hover:bg-secondary/80 border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "hover:bg-destructive/80 border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        Pending:
          "border-transparent bg-orange-500 text-white dark:bg-orange-300 dark:text-orange-700",
        "On Going":
          "border-transparent bg-yellow-500 text-white dark:bg-yellow-300 dark:text-yellow-700",
        Done: "border-transparent bg-green-500 text-white dark:bg-green-300 dark:text-green-700",
        "Pitching Concept":
          "border-transparent bg-gray-500 text-white dark:bg-gray-300 dark:text-gray-700",
        "In Preparation":
          "border-transparent bg-blue-500 text-white dark:bg-blue-300 dark:text-blue-700",
        Cancel:
          "border-transparent bg-red-500 text-white dark:bg-red-300 dark:text-red-700",
        Canceled:
          "border-transparent bg-red-500 text-white dark:bg-red-300 dark:text-red-700",
        In: "border-transparent bg-green-500 text-white dark:bg-green-300 dark:text-green-700",
        Out: "border-transparent bg-yellow-500 text-white dark:bg-yellow-300 dark:text-yellow-700",
        Hadir:
          "border-transparent bg-green-500 text-white dark:bg-green-300 dark:text-green-700",
        Izin: "border-transparent bg-purple-500 text-white dark:bg-purple-300 dark:text-purple-700",
        Sakit:
          "border-transparent bg-fuchsia-500 text-white dark:bg-fuchsia-300 dark:text-fuchsia-700",
        "No Progress":
          "border-transparent bg-gray-500 text-white dark:bg-gray-300 dark:text-gray-700",
        Koordinasi:
          "border-transparent bg-yellow-500 text-white dark:bg-yellow-300 dark:text-yellow-700",
        Konfirmasi:
          "border-transparent bg-orange-500 text-white dark:bg-orange-300 dark:text-orange-700",
        Loading:
          "border-transparent bg-blue-500 text-white dark:bg-blue-300 dark:text-blue-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
