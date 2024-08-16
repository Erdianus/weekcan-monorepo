import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

import { Select, SelectAsync } from "@hktekno/ui/components/select";
import { DateRangePicker } from "@hktekno/ui/components/ui/date-picker";
import { date4Y2M2D } from "@hktekno/ui/lib/date";
import { loadUserOptions, optionsAbsentType } from "@hktekno/ui/lib/select";

const FilterAbsent = ({ isLoading }: { isLoading?: boolean }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <SelectAsync
        className="w-auto"
        value={
          searchParams.get("user_id")
            ? {
                label: searchParams.get("user_name")?.toString(),
                value: searchParams.get("user_id")?.toString(),
              }
            : null
        }
        isClearable
        placeholder="Person In Charge"
        loadOptions={loadUserOptions}
        additional={{
          page: 1,
        }}
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const params = new URLSearchParams(searchParams);

          if (e) {
            params.set("user_id", `${e.value}`);
            params.set("user_name", `${e.label}`);
          } else {
            params.delete("user_id");
            params.delete("user_name");
          }

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
      <Select
        value={
          searchParams.get("type")
            ? {
                label: searchParams.get("type")?.toString(),
                value: searchParams.get("type")?.toString(),
              }
            : null
        }
        isClearable
        placeholder="Tipe"
        className="w-auto"
        options={optionsAbsentType()}
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const params = new URLSearchParams(searchParams);

          if (e) {
            params.set("type", `${e.value}`);
          } else {
            params.delete("type");
          }

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
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

export default FilterAbsent;
