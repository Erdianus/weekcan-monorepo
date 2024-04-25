"use client";

import { SelectAsync } from "@ui/components/select";
import { loadUserOptions } from "@ui/lib/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterCompany = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <div className="flex items-center gap-4">
      <SelectAsync
        defaultValue={
          searchParams.get("owner_id")
            ? {
                label: searchParams.get("owner_name")?.toString(),
                value: searchParams.get("owner_id")?.toString(),
              }
            : null
        }
        loadOptions={loadUserOptions}
        placeholder="Filter Pemilik"
        additional={{
          page: 1,
        }}
        className="w-auto"
        isClearable
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const params = new URLSearchParams(searchParams);

          if (e) {
            params.set("owner_id", `${e.value}`);
            params.set("owner_name", `${e.label}`);
          } else {
            params.delete("owner_id");
            params.delete("owner_name");
          }

          if (hasPage) params.delete("page");

          replace(`${pathname}?${params.toString()}`);
        }}
      />
    </div>
  );
};

export default FilterCompany;
