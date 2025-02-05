import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

import { DatePicker } from "@hktekno/ui/components/ui/date-picker";
import { date4Y2M2D } from "@hktekno/ui/lib/date";

const date = dayjs().add(1, "day").toDate();
const Filter = ({ isLoading }: { isLoading: boolean }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <DatePicker
        btnDisabled={isLoading}
        disabled={{
          after: date,
        }}
        value={
          searchParams.get("date")
            ? dayjs(searchParams.get("date")).toDate()
            : undefined
        }
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const params = new URLSearchParams(searchParams);
          console.log(e);

          if (e) {
            if (date4Y2M2D() === date4Y2M2D(e)) {
              params.delete("date");
            } else {
              params.set("date", `${date4Y2M2D(e)}`);
            }
          }

          if (!e) params.delete("date");

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
    </>
  );
};

export default Filter;
