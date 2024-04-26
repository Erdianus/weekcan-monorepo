"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Paginate = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <div className="flex items-center gap-4">
      <Label className="whitespace-nowrap">Per halaman:</Label>
      <Select
        defaultValue={searchParams.get('paginate')?.toString()}
        onValueChange={(v) => {
          const params = new URLSearchParams(searchParams);
          params.set('paginate', v);
          if (searchParams.get('page')) params.delete('page')

          replace(`${pathname}?${params.toString()}`)
        }}
      >
        <SelectTrigger className="w-24">
          <SelectValue
            onChange={(e) => console.log(e.target)}
            placeholder="10"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Paginate;
