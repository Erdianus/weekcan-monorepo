"use client";

import { useFormStatus } from "react-dom";

import type { ButtonProps } from "./button";
import { Button } from "./button";
import Spinner from "./spinner";

const ButtonSubmit = (props: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} className="w-full">
      {pending ? <Spinner /> : props.children}
    </Button>
  );
};

export default ButtonSubmit;
