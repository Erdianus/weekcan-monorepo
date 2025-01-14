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

const formSchema = z.object({
  name: z.string().min(1, "Tolong Isi Keahlian"),
});

const SkillSection = () => {
  const [searchParams] = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [modalData, setModalData] = useState<
    { id: number; name: string } | undefined
  >();
  const [selected, setSelected] = useState<string | number>("update");

  const client = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: "",
    },
  });

  const { data: skills, isLoading } = k.archive.skill.all.useQuery({
    variables: {
      searchSkill: variables.searchSkill,
    },
  });

  const create = k.archive.skill.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.archive.skill.all.getKey(),
      });
      form.reset();
    },
    onError: ({ message }) => toast.error(message),
  });

  const update = k.archive.skill.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.archive.skill.all.getKey(),
      });
      onClose();
      form.reset();
    },
    onError: ({ message }) => toast.error(message),
  });

  const del = k.archive.skill.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.archive.skill.all.getKey(),
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
              <ModalHeader>Keahlian</ModalHeader>
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
                        label="Nama Keahlian"
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
            <h2 className="text-3xl font-bold">Keahlian</h2>
            <Tooltip
              color="primary"
              showArrow={true}
              content="Contoh: Desain 3D, Sound Engineer"
            >
              <HelpCircle />
            </Tooltip>
          </div>
          <div className="flex items-center gap-4">
            <SearchInput
              searchKey="searchSkill"
              placeholder="Cari Keahlian..."
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
                    Tambah Keahlian
                  </p>
                  <Input
                    {...form.register("name")}
                    isInvalid={!!form.formState.errors.name}
                    errorMessage={form.formState.errors.name?.message}
                    label="Nama Keahlian"
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
            isloading={isLoading}
            loading={
              <Loading>
                <Skeleton className="h-6 w-10 rounded-full" />
              </Loading>
            }
          >
            {skills?.data.map((skill) => (
              <Chip
                key={`skill-${skill.id}`}
                size="sm"
                variant="bordered"
                onClick={() => {
                  onOpen();
                  form.setValue("name", skill.name);
                  setModalData({
                    id: skill.id,
                    name: skill.name,
                  });
                }}
              >
                {skill.name}
              </Chip>
            ))}
          </Flashlist>
        </div>
      </div>
    </>
  );
};

export { SkillSection };
