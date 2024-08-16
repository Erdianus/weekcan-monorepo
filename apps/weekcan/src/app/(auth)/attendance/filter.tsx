import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

import { DateRangePicker } from "@hktekno/ui/components/ui/date-picker";
import { date4Y2M2D } from "@hktekno/ui/lib/date";

const FilterAttendance = ({ isLoading }: { isLoading?: boolean }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <DateRangePicker
        mode="range"
        disabled={isLoading}
        value={
          searchParams.get("from")
            ? {
                from: dayjs(searchParams.get("from")).toDate(),
                to: searchParams.get("to")
                  ? dayjs(searchParams.get("to")).toDate()
                  : undefined,
              }
            : undefined
        }
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const params = new URLSearchParams(searchParams);
          console.log(e);

          if (e?.from) params.set("from", `${date4Y2M2D(e.from)}`);
          if (e?.to) params.set("to", `${date4Y2M2D(e.to)}`);

          if (!e?.from) params.delete("from");
          if (!e?.to) params.delete("to");

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
    </>
  );
};

export default FilterAttendance;
