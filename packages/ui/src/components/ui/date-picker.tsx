"use client";

import type { DateRange } from "react-day-picker";
import * as React from "react";
import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react";

import { dateRange } from "@hktekno/ui/lib/date";
import { cn } from "@hktekno/ui/lib/utils";

import type { CalendarProps } from "./calendar";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

function DatePicker() {
  const [date, setDate] = React.useState<Date>();

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void;
  className?: string;
};
function DateRangePicker(props?: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange>();

  const selected = props?.value ?? date;

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
          {selected ? (
            dateRange(selected.from, selected.to)
          ) : (
            <span>Pilih Tanggal</span>
          )}
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
          onSelect={props?.onChange ?? setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker, DateRangePicker };
