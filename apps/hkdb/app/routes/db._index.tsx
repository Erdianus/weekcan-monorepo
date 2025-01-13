import { useMemo } from "react";
import { Link, useSearchParams } from "@remix-run/react";
import {
  Cell,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { inferData } from "react-query-kit";

import { SelectAsync } from "@hktekno/ui/components/select";
import { Button } from "@hktekno/ui/components/ui/button";
import { DataTable } from "@hktekno/ui/components/ui/data-table";
import { Input } from "@hktekno/ui/components/ui/input";
import { Separator } from "@hktekno/ui/components/ui/separator";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import {
  loadDBCategoryOptions,
  loadDBSkillOptions,
} from "@hktekno/ui/lib/select";

import { k } from "~/api";

type Talent = inferData<
  typeof k.archive.talent.infinite
>["pages"][0]["data"][0];
const colHelper = createColumnHelper<Talent>();

const columns = [
  colHelper.accessor("name", {
    header: "Nama",
  }),
  colHelper.accessor("category.name", {
    header: "Kategori",
  }),
  colHelper.accessor("about", {
    header: "Tentang",
  }),
  colHelper.accessor("skill", {
    header: "Keahlian",
    cell: ({ getValue }) => <></>,
  }),
];

export default function Page() {
  const [searchParams, setSearchParams] = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const { data: talents, isLoading } =
    k.archive.talent.infinite.useInfiniteQuery({
      variables,
    });

  const data = useMemo(
    () => talents?.pages.flatMap((v) => v.data) ?? [],
    [talents],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <H3 className="text-3xl font-bold">Overview</H3>
        <div className="flex items-center gap-3">
          {/* <Input /> */}
          <Button type="button" asChild size={"icon"}>
            <Link to={"/db/create"}>
              <Plus />
            </Link>
          </Button>
        </div>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <p className="text-xs">Filter</p>
        <Separator className="flex-1" />
      </div>
      <div>
        <SelectAsync
          instanceId={"Perusahaan"}
          className="w-auto"
          defaultValue={
            searchParams.get("category_id")
              ? {
                  label: searchParams.get("category_name")?.toString(),
                  value: searchParams.get("category_id")?.toString(),
                }
              : null
          }
          isClearable
          placeholder="Kategory"
          loadOptions={loadDBCategoryOptions}
          additional={{
            page: 1,
          }}
          onChange={(e) => {
            const hasPage = !!searchParams.get("page");
            const params = new URLSearchParams(searchParams);

            if (e) {
              params.set("category_id", `${e.value}`);
              params.set("category_name", `${e.label}`);
            } else {
              params.delete("category_id");
              params.delete("category_name");
            }

            if (hasPage) params.delete("page");
            setSearchParams(params, { replace: true });
          }}
        />
      </div>
      {/* <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <AsyncSelectCategory
          label="Kategori"
          size="sm"
          placeholder="Pilih Kategori"
          defaultSelectedKey={searchParams.get("category_id")?.toString()}
          onSelectionChange={(e) => {
            const params = new URLSearchParams(searchParams);

            if (e) {
              params.set("category_id", `${e}`);
            } else {
              params.delete("category_id");
            }

            setSearchParams(params, { replace: true });
          }}
        />
        <AsyncSelectSkill
          label="Keahlian"
          size="sm"
          placeholder="Pilih Keahlian"
          defaultSelectedKey={searchParams.get("skill_id")?.toString()}
          onSelectionChange={(e) => {
            const params = new URLSearchParams(searchParams);

            if (e) {
              params.set("skill_id", `${e}`);
            } else {
              params.delete("skill_id");
            }

            setSearchParams(params, { replace: true });
          }}
        />
      </div> */}
      <div>
        <DataTable table={table} columns={columns} isloading={isLoading} />
      </div>
    </>
  );
}
