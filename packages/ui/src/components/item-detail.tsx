"use client";

import type { LucideIcon } from "lucide-react";
import type { SVGProps } from "react";

import { Skeleton } from "./ui/skeleton";

type ItemProps = {
  label: string;
  icon: LucideIcon | ((props: SVGProps<SVGSVGElement>) => JSX.Element);
  value?: string | JSX.Element;
  isload?: boolean;
};

const ItemDetail = (props: ItemProps) => {
  const isLoading = props.isload ?? !!props.value;
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-1.5">
        <props.icon className="h-5 w-5" />
        <p className="font-semibold">{props.label}</p>
      </div>
      <div className="ml-7">
        {isLoading ? <Skeleton className="h-4 w-24" /> : props.value}
      </div>
    </div>
  );
};

export { ItemDetail };
