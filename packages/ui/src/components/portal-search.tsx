"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { createPortal } from "react-dom";
import { useDebouncedCallback } from "use-debounce";

import type { InputProps } from "./ui/input";
import { cn } from "../lib/utils";
import { Input } from "./ui/input";

export default function PortalSearch(props: InputProps) {
  const inputref = useRef<HTMLInputElement | null>(null);
  const [mount, setMount] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term?: string) => {
    const hasPage = !!searchParams.get("page");
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
      if (hasPage) params.delete("page");
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputref.current?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return mount
    ? createPortal(
        <>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground">
              <Search size={18} />
            </div>
            <Input
              {...props}
              ref={inputref}
              defaultValue={searchParams.get("search")?.toString()}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              type="search"
              placeholder={props.placeholder ?? "Cari Sesuatu"}
              className={cn("bg-background pl-10", props.className)}
            />
            <kbd className="pointer-events-none absolute right-2.5 top-2.5 flex h-5 select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </>,
        // @ts-expect-error gapapa bro error
        document.querySelector("#portal-search"),
      )
    : null;
}
