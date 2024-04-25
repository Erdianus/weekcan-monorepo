"use client";
import k, { useQueryClient } from "@repo/api/kit";
import { Company } from "@repo/api/router/company/index";
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

const colHelper = createColumnHelper<Company>();

const Actions = ({ row }: CellContext<Company, unknown>) => {
  const alert = useAlertStore();

  const { original: data } = row;

  const client = useQueryClient();
  const del = k.company.delete.useMutation({
    async onSuccess({ message }) {
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.company.all.getKey() });
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
          <Link href={`/company/${data.id}/update`}>
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
                header: `Yakin ingin mengapus '${data.company_name}'?`,
                desc: 'Perusahaan yang dihapus tidak dapat dikembalikan lagi',
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
  colHelper.accessor("company_name", {
    header: "Nama",
  }),
  colHelper.accessor("email", {
    header: "Email",
  }),
  colHelper.accessor("address", {
    header: "Alamat",
  }),
  colHelper.display({
    id: "action",
    cell: Actions,
  }),
];

const ListCompany = () => {
  const searchParams = useSearchParams();

  const { data: companies, isLoading } = k.company.all.useQuery({
    variables: {
      search: searchParams.get("search"),
      page: searchParams.get("page"),
      paginate: searchParams.get("paginate"),
    },
  });

  const table = useReactTable({
    data: companies?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-4">
        <H3>Perusahaan</H3>
        <Button size={"icon"} asChild>
          <Link href="company/create">
            <Plus />
          </Link>
        </Button>
      </div>
      <PortalSearch placeholder="Cari Company..." />
      <DataTable table={table} isloading={isLoading} columns={columns} />
      <div className="mt-4 w-full flex items-center justify-end gap-5">
        <Paginate />
        <PaginationParams meta={companies?.meta} />
      </div>
    </div>
  );
};

export default ListCompany;
