import * as React from "react";
import i18nIsoCountries from "i18n-iso-countries";
import idCountries from "i18n-iso-countries/langs/id.json";
import {
  getExampleNumber,
  isValidPhoneNumber,
  parsePhoneNumberWithError as parsePhoneNumber,
} from "libphonenumber-js";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";
import { Props } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input/input";

import { cn } from "@hktekno/ui/lib/utils";

i18nIsoCountries.registerLocale(idCountries);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const InputCurrency = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  (props, ref) => {
    return (
      <CurrencyInput
        {...props}
        prefix={props.prefix ?? "Rp"}
        groupSeparator={props.groupSeparator ?? "."}
        decimalSeparator={props.decimalSeparator ?? ","}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          props.className,
        )}
        ref={ref}
      />
    );
  },
);

InputCurrency.displayName = "InputCurrency";

const InputPhone = React.forwardRef<HTMLInputElement, Props<InputProps>>(
  (props, ref) => {
    return (
      <PhoneInput {...props} ref={ref} country={"ID"} inputComponent={Input} />
    );
  },
);

InputPhone.displayName = "InputPhone";

export {
  Input,
  InputPhone,
  InputCurrency,
  getExampleNumber,
  isValidPhoneNumber,
  parsePhoneNumber,
};
