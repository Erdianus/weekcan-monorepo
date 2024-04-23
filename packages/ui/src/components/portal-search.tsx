"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Input, InputProps } from "./ui/input";
import { Search } from "lucide-react";
import { cn } from "@ui/lib/utils";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function PortalSearch(props: InputProps) {
  const [mount, setMount] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    setMount(true);
  }, []);

  return mount
    ? createPortal(
        <>
          <div className="relative">
            <div className=" absolute text-muted-foreground inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search size={20} />
            </div>
            <Input
              {...props}
              defaultValue={searchParams.get("search")?.toString()}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              type="search"
              placeholder={props.placeholder ?? "Cari Sesuatu"}
              className={cn("pl-10", props.className)}
            />
          </div>
        </>,
        // @ts-ignore
        document.querySelector("#portal-search"),
      )
    : null;
}
