import type { PropsWithChildren } from "react";

import { Separator } from "./ui/separator";

const FilterContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
        Filter
        <Separator className="flex-1" />
      </div>
      <div className="flex flex-wrap gap-4">{children}</div>
    </div>
  );
};

export { FilterContainer };
