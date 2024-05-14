"use client";

import type { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react";

import { dateRange } from "@hktekno/ui/lib/date";
import { cn } from "@hktekno/ui/lib/utils";

import type { CalendarProps } from "./calendar";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

function DatePicker() {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            dayjs(date).format("DD MMMM YYYY")
          ) : (
            <span>Pilih Tanggal</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

type DateRangePickerProps = CalendarProps & {
  value?: {
    from: Date;
    to?: Date;
  };
  onChange?: SelectRangeEventHandler;
  className?: string;
  defaultValue?: {
    from: Date;
    to?: Date;
  };
};
function DateRangePicker(props?: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange>();

  const text = useMemo(() => {
    if (props?.value) return dateRange(props.value?.from, props.value.to);

    if (date) return dateRange(date.from, date.to);

    if (props?.defaultValue)
      return dateRange(props.defaultValue.from, props.defaultValue.to);

    return <span>Pilih Tanggal</span>;
  }, [date, props?.defaultValue, props?.value]);

  useEffect(() => {
    if (props?.defaultValue) {
      setDate(props.defaultValue);
    }
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            props?.className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {text}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          disabled={props?.disabled}
          defaultMonth={props?.defaultMonth}
          fromDate={props?.fromDate}
          toDate={props?.toDate}
          fromMonth={props?.fromMonth}
          toMonth={props?.toMonth}
          mode="range"
          selected={props?.value ?? date}
          onSelect={(dr, d, a, m) => {
            if (props?.onChange) {
              props.onChange(dr, d, a, m);
              return;
            }
            setDate(dr);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker, DateRangePicker };
