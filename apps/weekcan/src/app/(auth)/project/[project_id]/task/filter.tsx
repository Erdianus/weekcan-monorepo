import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import dayjs from "dayjs";

import { Select, SelectAsync } from "@hktekno/ui/components/select";
import { DateRangePicker } from "@hktekno/ui/components/ui/date-picker";
import { date4Y2M2D } from "@hktekno/ui/lib/date";
import {
  loadUserOptions,
  optionsTaskProjectStatus,
} from "@hktekno/ui/lib/select";

const Filter = ({ isLoading }: { isLoading: boolean }) => {
  const params = useParams<{ project_id: string }>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <Select
        className="w-auto"
        options={optionsTaskProjectStatus()}
        defaultValue={
          searchParams.get("status")
            ? {
                label: searchParams.get("status"),
                value: searchParams.get("status"),
              }
            : null
        }
        isClearable
        isDisabled={isLoading}
        placeholder="Status Tugas"
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const params = new URLSearchParams(searchParams);

          if (e) {
            params.set("status", `${e.value}`);
          } else {
            params.delete("status");
          }

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
      <SelectAsync
        className="w-auto"
        value={
          searchParams.get("task_for")
            ? {
                label: searchParams.get("task_for_name")?.toString(),
                value: searchParams.get("task_for")?.toString(),
              }
            : null
        }
        isClearable
        placeholder="Person In Charge"
        loadOptions={loadUserOptions}
        additional={{
          page: 1,
          project_id: params.project_id,
        }}
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const params = new URLSearchParams(searchParams);

          if (e) {
            params.set("task_for", `${e.value}`);
            params.set("task_for_name", `${e.label}`);
          } else {
            params.delete("task_for");
            params.delete("task_for_name");
          }

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />

      <DateRangePicker
        mode="range"
        defaultMonth={dayjs(
          searchParams.get("from_date") ?? undefined,
        ).toDate()}
        disabled={isLoading}
        value={
          searchParams.get("from_date")
            ? {
                from: dayjs(searchParams.get("from_date")).toDate(),
                to: searchParams.get("to_date")
                  ? dayjs(searchParams.get("to_date")).toDate()
                  : undefined,
              }
            : undefined
        }
        onChange={(e) => {
          const hasPage = !!searchParams.get("page");
          const params = new URLSearchParams(searchParams);

          if (e?.from) params.set("from_date", `${date4Y2M2D(e.from)}`);
          if (e?.to) params.set("to_date", `${date4Y2M2D(e.to)}`);

          if (!e?.from) params.delete("from_date");
          if (!e?.to) params.delete("to_date");

          if (hasPage) params.delete("page");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
    </>
  );
};

export default Filter;
