"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Input, InputProps } from "./ui/input";
import { Search } from "lucide-react";
import { cn } from "@ui/lib/utils";

export default function PortalSearch(props: InputProps) {
  const [mount, setMount] = useState(false);
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
