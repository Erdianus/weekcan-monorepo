import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@ui/lib/utils";

const badgeVariants = cva<{ variant: Record<string, string> }>(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        Pending:
          "border-transparent text-white bg-orange-500 dark:bg-orange-300 dark:text-orange-700",
        "On Going":
          "border-transparent text-white bg-yellow-500 dark:bg-yellow-300 dark:text-yellow-700",
        Done: "border-transparent text-white bg-green-500 dark:bg-green-300 dark:text-green-700",
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
