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
        defaultValue={
          searchParams.get("company_id")
            ? {
                label: searchParams.get("company_name")?.toString(),
                value: searchParams.get("company_id")?.toString(),
              }
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

          if (e) {
            params.set("company_id", `${e.value}`);
            params.set("company_name", `${e.label}`);
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
