"use client";
import k, { useQueryClient } from "@repo/api/kit";
import { User } from "@repo/api/router/user/index";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  CellContext,
} from "@tanstack/react-table";
import PortalSearch from "@ui/components/portal-search";
import { Button } from "@ui/components/ui/button";
import { DataTable } from "@ui/components/ui/data-table";
import { H3 } from "@ui/components/ui/typograhpy";
import { useSearchParams } from "next/navigation";
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import PaginationParams from "@ui/components/pagination-params";
import Paginate from "@ui/components/paginate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import useAlertStore from "@ui/lib/store/useAlertStore";
import { toast } from "sonner";
import Spinner from "@ui/components/ui/spinner";
import { Badge } from "@ui/components/ui/badge";
import FilterUser from "./filter";

const colHelper = createColumnHelper<User>();

const Actions = ({ row }: CellContext<User, unknown>) => {
  const alert = useAlertStore();

  const { original: data } = row;

  const client = useQueryClient();
  const del = k.user.delete.useMutation({
    async onSuccess({ message }) {
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.user.all.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            {del.isPending ? (
              <Spinner />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Link href={`/user/${data.id}/update`}>
            <DropdownMenuItem>
              <Pencil className="mr-2 w-4 h-4" />
              <span>Edit</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={() =>
              alert.setData({
                open: true,
                confirmText: "Ya, Hapus",
                onConfirm: () => {
                  del.mutate({ id: data.id });
                },
              })
            }
            className="hover:bg-red-500 dark:hover:bg-red-900 dark:hover:text-red-50"
          >
            <Trash2 className="mr-2 w-4 h-4" />
            <span>Hapus</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

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
  colHelper.accessor("company", {
    header: "Perusahaan",
    cell: ({ getValue }) => {
      if (!getValue().length) return "-";

      return (
        <div className="flex items-center gap-4">
          {getValue()[0]?.company_name}
          {getValue().length > 1 && (
            <Badge variant={"secondary"}>{getValue().length - 1}+</Badge>
          )}
        </div>
      );
    },
  }),
  colHelper.display({
    id: "action",
    cell: Actions,
  }),
];

const ListUser = () => {
  const searchParams = useSearchParams();

  const { data: users, isLoading } = k.user.all.useQuery({
    variables: {
      search: searchParams.get("search"),
      page: searchParams.get("page"),
      paginate: searchParams.get("paginate"),
      company_id: searchParams.get("company_id"),
      company_name: searchParams.get("company_name")
    },
  });

  const table = useReactTable({
    data: users?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-4">
        <H3>User</H3>
        <div className="flex items-center gap-4">
          <FilterUser />
          <Button size={"icon"} asChild>
            <Link href="user/create">
              <Plus />
            </Link>
          </Button>
        </div>
      </div>
      <PortalSearch placeholder="Cari User..." />
      <DataTable table={table} isloading={isLoading} columns={columns} />
      <div className="mt-4 w-full flex items-center justify-end gap-5">
        <Paginate />
        <PaginationParams meta={users?.meta} />
      </div>
    </div>
  );
};

export default ListUser;
