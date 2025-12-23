import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

import { SelectAsync } from "@hktekno/ui/components/select";
import { DatePicker } from "@hktekno/ui/components/ui/date-picker";
import { date4Y2M2D } from "@hktekno/ui/lib/date";
import { loadJobTypeOptions } from "@hktekno/ui/lib/select";
import { loadCompanyOptions } from "@hktekno/ui/lib/select";

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
      <SelectAsync
        instanceId={"jobtype_filter"}
        className="w-auto"
        value={
          searchParams.getAll("job_type").length > 0
            ? searchParams.getAll("jobType_id").map((_, i) => ({
                value: `${searchParams.getAll("jobType_id")[i]?.toString()}`,
                label: `${searchParams.getAll("job_type")[i]?.toString()}`,
              }))
            : null
        }
        isClearable
        isMulti
        placeholder="Filter Jabatan"
        loadOptions={loadJobTypeOptions}
        additional={{
          page: 1,
        }}
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const params = new URLSearchParams(searchParams);
          params.delete(`job_type`);
          params.delete(`jobType_id`);
          if (e.length > 0) {
            e.forEach((ee) => {
              params.append(`job_type`, `${ee.label}`);
              params.append(`jobType_id`, `${ee.value}`);
            });
          }

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
      <SelectAsync
        instanceId={"filter_companyy"}
        isMulti
        defaultValue={
          searchParams.getAll("company_id").length > 0
            ? searchParams.getAll("company_id").map((value, i) => ({
                value,
                label: `${searchParams.getAll("company_name")[i]?.toString()}`,
              }))
            : null
        }
        loadOptions={loadCompanyOptions}
        placeholder="Filter Perusahaan"
        additional={{
          page: 1,
        }}
        className="w-auto"
        isClearable
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const params = new URLSearchParams(searchParams);
          params.delete(`company_name`);
          params.delete(`company_id`);
          if (e.length > 0) {
            e.forEach((ee) => {
              params.append(`company_id`, `${ee.value}`);
              params.append(`company_name`, `${ee.label}`);
            });
          }

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
    </>
  );
};

export default Filter;
