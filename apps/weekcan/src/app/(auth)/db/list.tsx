"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  CellContext,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { inferData, k } from "@hktekno/api";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { RoleAuth } from "@hktekno/ui/components/role";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { Button } from "@hktekno/ui/components/ui/button";
import { DataTable } from "@hktekno/ui/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@hktekno/ui/components/ui/dropdown-menu";
import { Separator } from "@hktekno/ui/components/ui/separator";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { useAlertStore } from "@hktekno/ui/lib/store/useAlertStore";
import useUserStore from "@hktekno/ui/lib/store/useUserStore";

type Talent = inferData<typeof k.hkdb.talent.all>["data"][number];

const colHelper = createColumnHelper<Talent>();

const Actions = ({ row }: CellContext<Talent, unknown>) => {
  const user = useUserStore();
  const alert = useAlertStore();

  const { original: data } = row;

  const client = useQueryClient();
  const del = k.hkdb.talent.delete.useMutation({
    async onSuccess({ message }) {
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.hkdb.talent.all.getKey() });
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
          <Link href={`/db/talent/${data.slug}`}>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              <span>Detail</span>
            </DropdownMenuItem>
          </Link>
          <RoleAuth roles={["Admin", "Owner", "Manager"]} role={user.role}>
            <Link href={`/db/update/${data.slug}`}>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() =>
                alert.setData({
                  open: true,
                  confirmText: "Ya, Hapus",
                  header: `Yakin ingin mengapus '${data.name}'?`,
                  desc: "data yang dihapus tidak dapat dikembalikan lagi",
                  onConfirm: () => {
                    del.mutate({ slug: data.slug });
                  },
                })
              }
              className="hover:bg-red-500 dark:hover:bg-red-900 dark:hover:text-red-50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Hapus</span>
            </DropdownMenuItem>
          </RoleAuth>
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
  colHelper.accessor("category_name", {
    header: "Kategori",
  }),
  colHelper.accessor("skill", {
    header: "Keahlian",
    cell: ({ getValue }) => {
      if (!getValue().length) return "-";

      return (
        <div className="flex items-center gap-4">
          {getValue()[0]?.name}
          {getValue().length > 1 && (
            <Badge variant={"secondary"}>{getValue().length - 1}+</Badge>
          )}
        </div>
      );
    },
  }),
  colHelper.display({
    id: "actions",
    cell: Actions,
  }),
];

export function ListTalent() {
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const { data, isLoading } = k.hkdb.talent.all.useQuery({ variables });

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <PortalSearch placeholder="Cari Data..." />
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          Filter
          <Separator className="flex-1" />
        </div>
        <div className="flex flex-wrap gap-4">
          {/* <FilterProject isLoading={isload} /> */}
        </div>
      </div>
      <DataTable table={table} columns={columns} isloading={isLoading} />
    </>
  );
}

/* export default function Lisst() {
  return <>hehehehe</>;
} */
