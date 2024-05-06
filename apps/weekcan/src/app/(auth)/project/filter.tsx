import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

import { SelectAsync } from "@hktekno/ui/components/select";
import { DateRangePicker } from "@hktekno/ui/components/ui/date-picker";
import { date4Y2M2D } from "@hktekno/ui/lib/date";
import { loadCompanyOptions, loadUserOptions } from "@hktekno/ui/lib/select";

const FilterProject = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <SelectAsync
        className="w-auto"
        defaultValue={
          searchParams.get("company_id")
            ? {
                label: searchParams.get("company_name")?.toString(),
                value: searchParams.get("company_id")?.toString(),
              }
            : null
        }
        isClearable
        placeholder="Perusahaan"
        loadOptions={loadCompanyOptions}
        additional={{
          page: 1,
        }}
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const hasUserId = !!searchParams.get("user_id");
          const hasUserName = !!searchParams.get("user_name");
          const params = new URLSearchParams(searchParams);

          if (e) {
            params.set("company_id", `${e.value}`);
            params.set("company_name", `${e.label}`);
          } else {
            params.delete("company_id");
            params.delete("company_name");
          }

          if (hasUserId) params.delete("user_id");
          if (hasUserName) params.delete("user_name");

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
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
        cacheUniqs={[searchParams.get("company_id")]}
        isClearable
        placeholder="Person In Charge"
        loadOptions={loadUserOptions}
        additional={{
          page: 1,
          company_id: [searchParams.get("company_id")],
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
      <DateRangePicker
        mode="range"
        value={
          searchParams.get("from") ?? searchParams.get("to")
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

          if (e?.from) params.set("from", `${date4Y2M2D(e.from)}`);
          if (e?.to) params.set("from", `${date4Y2M2D(e.to)}`);

          if (!e?.from) params.delete("from");
          if (!e?.to) params.delete("to");

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
    </>
  );
};

export default FilterProject;
