"use client";
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
import { useSearchParams } from "next/navigation";

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
      <PortalSearch placeholder="Cari User..." />
      <DataTable table={table} isloading={isLoading} columns={columns} />
    </div>
  );
};

export default ListUser;
