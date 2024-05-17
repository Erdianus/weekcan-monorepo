"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { SelectAsync } from "@hktekno/ui/components/select";
import { loadProjectOptions } from "@hktekno/ui/lib/select";

const Filter = () => {
  const params = useParams<{ company_id: string }>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <SelectAsync
        className="w-auto"
        defaultValue={
          searchParams.get("project_id")
            ? {
                label: searchParams.get("project_name")?.toString(),
                value: searchParams.get("project_id")?.toString(),
              }
            : null
        }
        isClearable
        placeholder="Proyek"
        loadOptions={loadProjectOptions}
        additional={{
          page: 1,
          company_id: params.company_id,
        }}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams);

          if (e) {
            params.set("project_id", `${e.value}`);
            params.set("project_name", `${e.label}`);
          } else {
            params.delete("project_id");
            params.delete("project_name");
          }

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
    </>
  );
};

export default Filter;
