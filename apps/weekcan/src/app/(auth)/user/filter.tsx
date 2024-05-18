"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SelectAsync } from "@hktekno/ui/components/select";
import { loadCompanyOptions } from "@hktekno/ui/lib/select";

const FilterUser = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <SelectAsync
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

          if (e.length > 0) {
            e.forEach((ee) => {
              params.append("company_id", `${ee.value}`);
              params.append("company_name", `${ee.label}`);
            });
          } else {
            params.delete("company_id");
            params.delete("company_name");
          }

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
    </div>
  );
};

export default FilterUser;
