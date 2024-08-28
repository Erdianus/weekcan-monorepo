"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@hktekno/ui/lib/utils";

import type { ButtonProps } from "./button";
import { Button } from "./button";
import Spinner from "./spinner";

const ButtonSubmit = (props: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} className={cn("w-full", props.className)}>
      {pending ? <Spinner /> : props.children}
    </Button>
  );
};

export default ButtonSubmit;
