import { cn } from "@ui/lib/utils";
import { Loader2, LucideProps } from "lucide-react";

const Spinner = (props: LucideProps) => {
  return (
    <Loader2
      {...props}
      className={cn("h-4 w-4 animate-spin", props.className)}
    />
  );
};

export default Spinner;
