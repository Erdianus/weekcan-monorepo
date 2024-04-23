"use client";
import { useState } from "react";
import { k } from "@repo/api/kit";
import { User } from "@repo/api/router/user/index";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import PortalSearch from "@ui/components/portal-search";
import { DataTable } from "@ui/components/ui/data-table";
import { H3 } from "@ui/components/ui/typograhpy";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const colHelper = createColumnHelper<User>();

const columns = [
  colHelper.display({
    header: "No",
    cell: ({ row }) => row.index + 1,
  }),
  colHelper.accessor("name", {
    header: "Nama",
  }),
  colHelper.accessor("email", {
    header: "Email",
  }),
  colHelper.accessor("role_name", {
    header: "Jabatan",
  }),
];

const ListUser = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const { data: users, isLoading } = k.user.all.useQuery({
    variables: { search: searchParams.get("search") ?? "" },
  });

  const table = useReactTable({
    data: users?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <H3 className="mb-4">User</H3>
      <PortalSearch
        defaultValue={searchParams.get('search')?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Cari User..."
      />
      <DataTable table={table} isloading={isLoading} columns={columns} />
    </div>
  );
};

export default ListUser;
