"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import Loading from "@hktekno/ui/components/loading";
import Paginate from "@hktekno/ui/components/paginate";
import PaginationParams from "@hktekno/ui/components/pagination-params";
import PortalSearch from "@hktekno/ui/components/portal-search";
import { Button } from "@hktekno/ui/components/ui/button";
import { DrawerDialog } from "@hktekno/ui/components/ui/drawer";
import { Input } from "@hktekno/ui/components/ui/input";
import { Label } from "@hktekno/ui/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@hktekno/ui/components/ui/popover";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import Spinner from "@hktekno/ui/components/ui/spinner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@hktekno/ui/components/ui/tabs";

const textlabel: Record<string, string> = {
  category: "Kategori",
  skill: "Keahlian",
};

const formSchema = z.object({
  name: z.string().min(1, `Tolong di isi`),
});

export function ListCategorySkill() {
  const [currData, setCurrData] = useState<
    { id: string | number; name: string } | undefined
  >();
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const [value, setValue] = useState("category");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: "",
    },
  });

  const client = useQueryClient();
  const { data: categories } = k.hkdb.category.all.useQuery({
    variables,
    enabled: value === "category",
  });

  const { data: skills } = k.hkdb.skill.all.useQuery({
    variables,
    enabled: value === "skill",
  });

  const createCategory = k.hkdb.category.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.hkdb.category.all.getKey(),
      });
      form.setValue("name", "");
    },
    onError: ({ message }) => toast.error(message),
  });

  const createSkill = k.hkdb.skill.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.hkdb.skill.all.getKey(),
      });
      form.setValue("name", "");
    },
    onError: ({ message }) => toast.error(message),
  });

  const updateCategory = k.hkdb.category.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.hkdb.category.all.getKey(),
      });
      setCurrData(undefined);
      form.setValue("name", "");
    },
    onError: ({ message }) => toast.error(message),
  });

  const updateSkill = k.hkdb.skill.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.hkdb.skill.all.getKey(),
      });
      setCurrData(undefined);
      form.setValue("name", "");
    },
    onError: ({ message }) => toast.error(message),
  });

  const delCategory = k.hkdb.category.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.hkdb.category.all.getKey(),
      });
      setCurrData(undefined);
      form.setValue("name", "");
    },
    onError: ({ message }) => toast.error(message),
  });

  const delSkill = k.hkdb.skill.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.hkdb.skill.all.getKey(),
      });
      setCurrData(undefined);
      form.setValue("name", "");
    },
    onError: ({ message }) => toast.error(message),
  });

  const isPending = createCategory.isPending || createSkill.isPending;

  return (
    <>
      <PortalSearch placeholder={`Cari ${textlabel[value]}`} />
      <DrawerDialog
        open={!!currData}
        title={currData?.name}
        onOpenChange={(open) => {
          if (!open) {
            setCurrData(undefined);
            form.setValue("name", "");
          }
        }}
      >
        <Tabs defaultValue="update">
          <TabsList className="w-full">
            <TabsTrigger value="update" className="basis-1/2">
              Update
            </TabsTrigger>
            <TabsTrigger
              value="delete"
              className="basis-1/2 data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
            >
              Hapus
            </TabsTrigger>
          </TabsList>
          <TabsContent value="update">
            <form
              onSubmit={form.handleSubmit((data) => {
                if (value === "category") {
                  updateCategory.mutate({
                    id: currData?.id ?? "",
                    data,
                  });
                  return;
                }
                updateSkill.mutate({
                  id: currData?.id ?? "",
                  data,
                });
              })}
              className="space-y-4"
            >
              <div>
                {" "}
                <Label className="mb-2">Nama {textlabel[value]}</Label>
                <Input
                  {...form.register("name")}
                  placeholder={`Isi Nama ${textlabel[value]}`}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={updateCategory.isPending || updateSkill.isPending}
              >
                Submit{" "}
                {(updateCategory.isPending || updateSkill.isPending) && (
                  <Spinner />
                )}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="delete">
            <p className="mb-1 font-bold text-destructive-foreground">
              Yakin ingin menghapus {currData?.name}
            </p>
            <p className="mb-4 text-destructive-foreground">
              Data yang sudah dihapus tidak dapat dikembalikan
            </p>
            <Button
              className="w-full"
              type="submit"
              variant={"destructive"}
              onClick={() => {
                if (value === "category") {
                  delCategory.mutate({
                    id: currData?.id ?? "",
                  });
                  return;
                }
                delSkill.mutate({
                  id: currData?.id ?? "",
                });
              }}
            >
              Hapus{" "}
              {(delCategory.isPending || delSkill.isPending) && <Spinner />}
            </Button>
          </TabsContent>
        </Tabs>
      </DrawerDialog>
      <Tabs defaultValue={value} onValueChange={setValue}>
        <div className="mb-4 flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="category">Kategori</TabsTrigger>
            <TabsTrigger value="skill">Keahlian</TabsTrigger>
          </TabsList>
          <Popover>
            <PopoverTrigger asChild className="relative">
              <Button className="relative" size={"icon"}>
                <Plus />
                <Zap className="absolute bottom-1 right-1" size={12} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    Tambah {textlabel[value]}
                  </h4>
                </div>
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit((data) => {
                    if (value === "category") {
                      createCategory.mutate({
                        data,
                      });
                      return;
                    }
                    createSkill.mutate({
                      data,
                    });
                    /* create.mutate({
                    data: {
                      company_id: data.company.value,
                      job_name: data.job_name,
                    },
                  }); */
                  })}
                >
                  <div>
                    <Label className="mb-2">Nama {textlabel[value]}</Label>
                    <Input
                      {...form.register("name")}
                      placeholder={`Isi Nama ${textlabel[value]}`}
                    />
                  </div>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? <Spinner /> : "Submit"}
                  </Button>
                </form>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <TabsContent value="category">
          <div className="flex flex-wrap items-center gap-4">
            <Flashlist
              isloading={!categories}
              loading={
                <Loading keyname="loadcategory">
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </Loading>
              }
            >
              {categories?.data.map((category) => {
                return (
                  <Button
                    size={"sm"}
                    key={`category-${category.id}`}
                    variant={"outline"}
                    onClick={() => {
                      setCurrData(category);
                      form.setValue("name", category.name);
                    }}
                  >
                    {category.name}
                  </Button>
                );
              })}
            </Flashlist>
          </div>
        </TabsContent>
        <TabsContent value="skill">
          <div className="flex flex-wrap items-center gap-4">
            <Flashlist
              isloading={!skills}
              loading={
                <Loading keyname="loadskills">
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </Loading>
              }
            >
              {skills?.data.map((skill) => {
                return (
                  <Button
                    size={"sm"}
                    key={`skill-${skill.id}`}
                    variant={"outline"}
                    onClick={() => {
                      setCurrData(skill);
                      form.setValue("name", skill.name);
                    }}
                  >
                    {skill.name}
                  </Button>
                );
              })}
            </Flashlist>
          </div>
        </TabsContent>
      </Tabs>
      <div className="mt-4 flex w-full items-center justify-end gap-2">
        <Paginate />
        <PaginationParams
          meta={value === "category" ? categories?.meta : skills?.meta}
        />
      </div>{" "}
    </>
  );
}
