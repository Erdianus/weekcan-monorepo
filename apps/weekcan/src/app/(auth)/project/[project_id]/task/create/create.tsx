"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import { taskProjectFormSchema } from "@hktekno/api/routers/project/task/schema";
import { Select, SelectAsync } from "@hktekno/ui/components/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@hktekno/ui/components/ui/accordion";
import { Button } from "@hktekno/ui/components/ui/button";
import { Checkbox } from "@hktekno/ui/components/ui/checkbox";
import { DateRangePicker } from "@hktekno/ui/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@hktekno/ui/components/ui/form";
import { Input } from "@hktekno/ui/components/ui/input";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import { date4Y2M2D } from "@hktekno/ui/lib/date";
import {
  loadProjectOptions,
  loadProjectSprintOptions,
  loadUserOptions,
  optionsTaskProjectStatus,
} from "@hktekno/ui/lib/select";
import useUserStore from "@hktekno/ui/lib/store/useUserStore";

const taskProjectForm = taskProjectFormSchema
  .omit({
    project_id: true,
    sprint_id: true,
    task_for: true,
    start_date: true,
    end_date: true,
    task_status: true,
  })
  .extend({
    sprint: z
      .object(
        {
          label: z.string(),
          value: z.string(),
        },
        { invalid_type_error: "Tolong Pilih Jadwal" },
      )
      .nullish(),
    project: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .nullish(),
    task_for: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .nullish(),
    date: z.object(
      {
        from: z.date({ required_error: "Tolong Pilih Tanggal" }),
        to: z.date().optional(),
      },
      {
        required_error: "Tolong Pilih Tanggal",
        invalid_type_error: "Tolong Pilih Tanggal",
      },
    ),
    status: z.object(
      {
        label: z.string(),
        value: z.string(),
      },
      { invalid_type_error: "Tolong Pilih Status" },
    ),
  });

const CreateTask = ({ project_id }: { project_id: string }) => {
  const router = useRouter();
  const user = useUserStore();
  const { data: project } = k.project.single.useQuery({
    variables: { id: project_id },
  });

  const form = useForm<z.infer<typeof taskProjectForm>>({
    resolver: zodResolver(taskProjectForm),
    values: {
      task_name: "",
      desc: "",
      // @ts-expect-error sengaja memang null
      date: null,
      status: {
        label: "On Going",
        value: "On Going",
      },
      task_for: null,
      have_daily_task: 1,
      project: null,
      sprint: null,
    },
  });

  const client = useQueryClient();

  const create = k.project.task.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      router.push(`/project/${project_id}/task`);
      await client.invalidateQueries({ queryKey: k.project.task.all.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });

  useEffect(() => {
    if (project) {
      form.setValue("project", {
        label: project.data.project_name,
        value: `${project.data.id}`,
      });
    }
  }, [project]);

  return (
    <>
      <H3 className="mb-4">Buat Tugas Proyek Baru</H3>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((v) => {
            create.mutate({
              data: {
                ...v,
                project_id: v.project?.value ?? project_id,
                task_for: v.task_for?.value ?? `${user.id}`,
                start_date: date4Y2M2D(v.date.from),
                end_date: v.date.to
                  ? date4Y2M2D(v.date.to)
                  : date4Y2M2D(v.date.from),
                task_status: v.status.value ?? "On Going",
                set_by:
                  `${user.id}` === `${v.task_for?.value}` ? null : `${user.id}`,
              },
            });
          })}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="task_name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nama Tugas</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Contoh: Desain Spanduk" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Contoh: Desain Spanduk untuk instagram"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="col-span-2 flex flex-col gap-2">
                  <FormLabel>Tanggal</FormLabel>
                  <FormControl>
                    <DateRangePicker
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Status Tugas</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      options={optionsTaskProjectStatus()}
                      placeholder="Pilih Status"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="optional-form">
              <AccordionTrigger>Pilihan Opsional</AccordionTrigger>
              <AccordionContent className="space-y-4 px-2">
                <FormField
                  control={form.control}
                  name="task_for"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Karyawan</FormLabel>
                        <FormControl>
                          <SelectAsync
                            cacheUniqs={[form.watch("project")]}
                            placeholder="Pilih Karyawan"
                            selectRef={field.ref}
                            value={field.value}
                            onChange={field.onChange}
                            loadOptions={loadUserOptions}
                            additional={{
                              page: 1,
                              project_id:
                                form.watch("project.value") ?? project_id,
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Pakai jika ingin memberi tugas ke karyawan lain.
                          Kosongkan jika tugas sendiri
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="sprint"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Jadwal</FormLabel>
                          <FormControl>
                            <SelectAsync
                              cacheUniqs={[form.watch("project")]}
                              placeholder="Pilih Jadwal"
                              selectRef={field.ref}
                              value={field.value}
                              onChange={field.onChange}
                              loadOptions={loadProjectSprintOptions}
                              additional={{
                                page: 1,
                                project_id:
                                  form.watch("project.value") ?? project_id,
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Pakai jika tugas ada di skema jadwal
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="project"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Proyek</FormLabel>
                          <FormControl>
                            <SelectAsync
                              isClearable
                              placeholder={`Default: ${project?.data.project_name}`}
                              selectRef={field.ref}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e);
                                form.setValue("sprint", null);
                                form.setValue("task_for", null);
                              }}
                              loadOptions={loadProjectOptions}
                              additional={{ page: 1 }}
                            />
                          </FormControl>
                          <FormDescription>
                            Pakai jika ingin mengganti proyek
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="have_daily_task"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={Boolean(field.value)}
                            onClick={() => field.onChange(Number(!field.value))}
                          />
                        </FormControl>
                        <FormLabel>Punya Perilal</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button disabled={create.isPending}>
            {create.isPending ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateTask;
