import type { CellContext } from "@tanstack/react-table";
import type { inferData } from "react-query-kit";
import { useMemo } from "react";
import {
  Button,
  Chip,
  Divider,
  Link,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  ScrollShadow,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useSearchParams } from "@remix-run/react";
import { useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

/* import { SelectAsync } from "@hktekno/ui/components/select";
import { loadCityOptions } from "@hktekno/ui/lib/select"; */

import { k } from "~/api";
import {
  AsyncSelectCategory,
  AsyncSelectSkill,
} from "~/components/ui/async-select";
import { SearchInput } from "~/components/ui/search";

type Talent = inferData<
  typeof k.archive.talent.infinite
>["pages"][0]["data"][0];

const colHelper = createColumnHelper<Talent>();

const Actions = ({ row }: CellContext<Talent, unknown>) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { slug } = row.original;
  const queryClient = useQueryClient();

  const { mutate: deleteTalent, isPending } =
    k.archive.talent.delete.useMutation({
      onSuccess: async ({ message }) => {
        toast.success(message);
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: k.archive.talent.infinite.getKey(),
          }),
          queryClient.invalidateQueries({
            queryKey: k.archive.skill.all.getKey(),
          }),
        ]);
        onClose();
      },
      onError: ({ message }) => toast.error(message),
    });

  return (
    <div className="flex items-center gap-4">
      <Tooltip content="Detail">
        <Link className="text-default-500" href={`/db/talent/${slug}`}>
          <Eye className="cursor-pointer" />
        </Link>
      </Tooltip>
      <Tooltip content="Edit">
        <Link className="text-default-500" href={`/db/talent/update/${slug}`}>
          <Pencil className="cursor-pointer" />
        </Link>
      </Tooltip>
      <Tooltip color="danger" content="Hapus">
        <Trash2
          className="text-danger cursor-pointer"
          onClick={onOpen}
          role="button"
          aria-label="Delete talent"
        />
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Hapus Data?
              </ModalHeader>
              <ModalFooter>
                <Button variant="bordered" onPress={onClose}>
                  Batal
                </Button>
                <Button
                  color="danger"
                  isLoading={isPending}
                  onClick={() => deleteTalent({ slug })}
                >
                  Ya, Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default function TalentTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());

  const { data: talents, isLoading } =
    k.archive.talent.infinite.useInfiniteQuery({
      variables: {
        ...variables,
      },
    });

  const data = useMemo(
    () => talents?.pages.flatMap((v) => v.data) ?? [],
    [talents],
  );

  const currentPage = talents?.pages[0]?.meta?.current_page;
  const totalPages = talents?.pages[0]?.meta?.last_page;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params, { replace: true });
  };

  const columns = useMemo(
    () => [
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
        cell: ({ getValue }) => (
          <ScrollShadow
            orientation="horizontal"
            className="flex items-center gap-4"
          >
            {getValue().map((v) => (
              <Chip size="sm" key={`skill-${v.id}`}>
                {v.name}
              </Chip>
            ))}
          </ScrollShadow>
        ),
      }),
      colHelper.display({
        id: "actions",
        cell: (props) => <Actions {...props} />,
      }),
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {/* <SelectAsync loadOptions={loadCityOptions} /> */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Overview</h2>
        <div className="flex items-center gap-3">
          <SearchInput searchKey="search" placeholder="Cari Data..." />
          <Button
            aria-label="Plus"
            isIconOnly
            color="primary"
            as={Link}
            href="db/create"
          >
            <Plus />
          </Button>
        </div>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <p className="text-xs">Filter</p>
        <Divider className="flex-1" />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <AsyncSelectCategory
          aria-label="Kategori"
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
          aria-label="Keahlian"
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
      </div>
      <div>
        <Table aria-label="tabel-talent" isHeaderSticky>
          <TableHeader columns={table.getFlatHeaders()}>
            {(header) => (
              <TableColumn key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={table.getRowModel().rows}
            isLoading={isLoading}
            loadingContent={<Spinner />}
            emptyContent="Tidak Ada Data"
          >
            {(row) => (
              <TableRow key={row.id}>
                {(columnKey) => {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  const cell = row
                    .getVisibleCells()
                    .find((s) => s.column.id === columnKey)!;
                  return (
                    <TableCell>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-center">
          <Pagination
            showControls
            total={totalPages ?? 0}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
