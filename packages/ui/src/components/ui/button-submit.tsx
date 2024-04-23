import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./button";
import Spinner from "./spinner";

const ButtonSubmit = (props: ButtonProps) => {
  const { pending } = useFormStatus();

  return <Button {...props}>{pending ? <Spinner /> : props.children}</Button>;
};

export default ButtonSubmit;
