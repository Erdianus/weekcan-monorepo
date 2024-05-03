import type { LucideProps } from "lucide-react";
import { Loader2 } from "lucide-react";

import { cn } from "@hktekno/ui/lib/utils";

const Spinner = (props: LucideProps) => {
  return (
    <Loader2
      {...props}
      className={cn("h-4 w-4 animate-spin", props.className)}
    />
  );
};

export default Spinner;
