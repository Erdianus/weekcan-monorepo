import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  Tab,
  Tabs,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useSearchParams } from "@remix-run/react";
import { useQueryClient } from "@tanstack/react-query";
import { HelpCircle, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "~/api";
import { Flashlist } from "~/components/ui/flashlist";
import { Loading } from "~/components/ui/loading";
import { SearchInput } from "~/components/ui/search";

const formCategorySchema = z.object({
  name: z.string().min(1, "Tolong Isi Kategori"),
});

const CategorySection = () => {
  const [searchParams] = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [modalData, setModalData] = useState<
    { id: number; name: string } | undefined
  >();
  const [selected, setSelected] = useState<string | number>("update");

  const client = useQueryClient();

  const form = useForm<z.infer<typeof formCategorySchema>>({
    resolver: zodResolver(formCategorySchema),
    values: {
      name: "",
    },
  });

  const { data: categories, isLoading: loadCategory } =
    k.archive.category.all.useQuery({
      variables: {
        searchCategory: variables.searchCategory,
      },
    });

  const create = k.archive.category.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.archive.category.all.getKey(),
      });
      form.reset();
    },
    onError: ({ message }) => toast.error(message),
  });

  const update = k.archive.category.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.archive.category.all.getKey(),
      });
      onClose();
      form.reset();
    },
    onError: ({ message }) => toast.error(message),
  });

  const del = k.archive.category.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.archive.category.all.getKey(),
      });
      onClose();
      form.reset();
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={(isOpen) => {
          onOpenChange();

          if (!isOpen) {
            form.setValue("name", "");
            setModalData(undefined);
            setSelected("update");
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Kategori</ModalHeader>
              <ModalBody>
                <Tabs
                  fullWidth
                  size="md"
                  aria-label="Tabs form"
                  selectedKey={selected}
                  onSelectionChange={setSelected}
                >
                  <Tab key={"update"} title="Update">
                    <form
                      onSubmit={form.handleSubmit((data) => {
                        if (modalData?.id) {
                          update.mutate({
                            id: modalData.id,
                            data,
                          });
                        }
                      })}
                      className="space-y-4"
                    >
                      <Input
                        {...form.register("name")}
                        isInvalid={!!form.formState.errors.name}
                        errorMessage={form.formState.errors.name?.message}
                        label="Nama Kategori"
                        variant="underlined"
                        className="mb-4"
                      />
                      <Button
                        isDisabled={
                          form.watch("name").length < 1 || create.isPending
                        }
                        color="primary"
                        fullWidth
                        type="submit"
                        isLoading={update.isPending}
                      >
                        Update
                      </Button>
                    </form>
                  </Tab>
                  <Tab key={"delete"} title="Delete">
                    <div className="space-y-2">
                      <p className="text-danger text-sm">
                        Data tidak dapat dikembalikan jika sudah dihapus
                      </p>
                      <Button
                        color={"danger"}
                        fullWidth
                        isLoading={del.isPending}
                        onClick={() => {
                          if (modalData) del.mutate({ id: modalData.id });
                        }}
                      >
                        Ya, Hapus
                      </Button>
                      <Button variant="bordered" fullWidth onClick={onClose}>
                        Kembali
                      </Button>
                    </div>
                  </Tab>
                </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold">Kategori</h2>
            <Tooltip
              color="primary"
              showArrow={true}
              content="Contoh: SDM, Talent, Tenant"
            >
              <HelpCircle />
            </Tooltip>
          </div>
          <div className="flex items-center gap-4">
            <SearchInput
              searchKey="searchCategory"
              placeholder="Cari Kategori..."
            />
            <Popover placement="bottom" showArrow offset={10}>
              <PopoverTrigger>
                <Button type="button" isIconOnly color="primary">
                  <Plus />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-4">
                <form
                  onSubmit={form.handleSubmit((data) => {
                    create.mutate({ data });
                  })}
                  className="space-y-4"
                >
                  <p className="text-left text-xs font-bold text-gray-500">
                    Tambah Kategori
                  </p>
                  <Input
                    {...form.register("name")}
                    isInvalid={!!form.formState.errors.name}
                    errorMessage={form.formState.errors.name?.message}
                    label="Nama Kategori"
                    variant="underlined"
                    className="mb-4"
                  />
                  <Button
                    isDisabled={
                      form.watch("name").length < 1 || create.isPending
                    }
                    color="primary"
                    fullWidth
                    type="submit"
                    isLoading={create.isPending}
                  >
                    Tambah
                  </Button>
                </form>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-5">
          <Flashlist
            isloading={loadCategory}
            loading={
              <Loading>
                <Skeleton className="h-6 w-10 rounded-full" />
              </Loading>
            }
          >
            {categories?.data.map((category) => (
              <Chip
                key={`category-${category.id}`}
                size="sm"
                variant="bordered"
                className="cursor-pointer hover:text-primary"
                onClick={() => {
                  onOpen();
                  form.setValue("name", category.name);
                  setModalData({
                    id: category.id,
                    name: category.name,
                  });
                }}
              >
                {category.name}
              </Chip>
            ))}
          </Flashlist>
        </div>
      </div>
    </>
  );
};

export { CategorySection };
