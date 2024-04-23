"use client";
import { k } from "@repo/api/kit";
import { User } from "@repo/api/router/user/index";
import { createColumnHelper, useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { DataTable } from "@ui/components/ui/data-table";

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
  const { data: users, isLoading } = k.user.all.useQuery();

  const table = useReactTable({
    data: users?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div>
      <DataTable table={table} isloading={isLoading} columns={columns} />
    </div>
  );
};

export default ListUser;
