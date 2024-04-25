"use client";

import { SelectAsync } from "@ui/components/select";
import { loadCompanyOptions } from "@ui/lib/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterUser = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <div className="flex items-center gap-4">
      <SelectAsync
        loadOptions={loadCompanyOptions}
        placeholder="Filter Perusahaan"
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

          replace(`${pathname}?${params.toString()}`);
        }}
      />
    </div>
  );
};

export default FilterUser;
