"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
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
  loadProjectSprintJSONOptions,
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

const UpdateTaskProject = ({
  project_id,
  id,
}: {
  project_id: string;
  id: string;
}) => {
  const router = useRouter();
  const user = useUserStore();

  const { data: task } = k.project.task.single.useQuery({ variables: { id } });

  const isload = !task;

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

  const projectID = useMemo(() => {
    const data = JSON.parse(form.watch("project.value") ?? '{"id": null}') as {
      id: string | null;
    };
    if (data.id) return data.id;

    return project_id;
  }, [form.watch("project"), project_id]);

  const { data: project } = k.project.single.useQuery({
    variables: { id: projectID },
  });

  const client = useQueryClient();

  const update = k.project.task.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      router.push(`/project/${project_id}/task`);
      await client.invalidateQueries({ queryKey: k.project.task.all.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });

  const disableDate = useMemo(() => {
    if (form.watch("sprint")) {
      const data = JSON.parse(`${form.watch("sprint")?.value}`) as {
        start_date: string;
        end_date: string;
      };
      return {
        before: dayjs(data.start_date).toDate(),
        after: dayjs(data.end_date).toDate(),
      };
    }

    if (project) {
      return {
        before: dayjs(project.data.start_date).toDate(),
        after: dayjs(project.data.end_date).toDate(),
      };

      // Ini kalau pakai select
      /* const data = JSON.parse(`${form.watch("project.value")}`) as {
        start_date: string;
        end_date: string;
      };
      return {
        before: dayjs(data.start_date).toDate(),
        after: dayjs(data.end_date).toDate(),
      }; */
    }
    return undefined;
  }, [form.watch("project"), form.watch("sprint"), project]);

  useEffect(() => {
    if (task) {
      const { data } = task;
      form.reset({
        task_name: data.task_name,
        desc: data.desc,
        date: {
          from: dayjs(data.start_date).toDate(),
          to: dayjs(data.end_date).toDate(),
        },
        status: {
          label: data.task_status,
          value: data.task_status,
        },
        task_for:
          `${data.task_for}` === `${user.id}`
            ? null
            : {
                label: data.task_for_name,
                value: `${data.task_for}`,
              },
        have_daily_task: +data.have_daily_task,
        set_by: `${user.id}` === `${data.task_for}` ? null : `${data.set_by}`,
        project: {
          label: data.project_name,
          value: JSON.stringify({
            id: `${data.project_id}`,
            start_date: date4Y2M2D(),
            end_date: date4Y2M2D(),
          }),
        },
        sprint: !data.sprint
          ? null
          : {
              label: data.sprint.title,
              value: JSON.stringify({
                id: `${data.sprint.id}`,
                start_date: data.sprint.start_date,
                end_date: data.sprint.end_date,
              }),
            },
      });
    }
  }, [task]);

  return (
    <>
      <H3 className="mb-4">Update Kerjaan Proyek</H3>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((v) => {
            const sprint = JSON.parse(v.sprint?.value ?? `{"id": null}`) as {
              id: string | null;
            };
            const proyek = JSON.parse(v.project?.value ?? `{"id": null}`) as {
              id: string | null;
            };
            update.mutate({
              id,
              data: {
                ...v,
                project_id: proyek.id ?? project_id,
                sprint_id: sprint.id,
                task_for: v.task_for?.value ?? `${user.id}`,
                start_date: date4Y2M2D(v.date.from),
                end_date: v.date.to
                  ? date4Y2M2D(v.date.to)
                  : date4Y2M2D(v.date.from),
                task_status: v.status.value ?? "On Going",
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
                    <FormLabel>Nama Kerjaan</FormLabel>
                    <FormControl isloading={isload}>
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
                    <FormControl isloading={isload}>
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
                  <FormControl isloading={isload}>
                    <DateRangePicker
                      disabled={disableDate}
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
                  <FormLabel>Status Kerjaan</FormLabel>
                  <FormControl isloading={isload}>
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
                        <FormControl isloading={isload}>
                          <SelectAsync
                            cacheUniqs={[form.watch("project")]}
                            placeholder="Pilih Karyawan"
                            selectRef={field.ref}
                            value={field.value}
                            onChange={field.onChange}
                            loadOptions={loadUserOptions}
                            additional={{
                              page: 1,
                              project_id: projectID,
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Pakai jika ingin memberi kerjaan ke karyawan lain.
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
                          <FormControl isloading={isload}>
                            <SelectAsync
                              cacheUniqs={[form.watch("project")]}
                              placeholder="Pilih Jadwal"
                              isClearable
                              selectRef={field.ref}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e);
                                // @ts-expect-error gapapa error gan
                                form.setValue("date", null);
                              }}
                              loadOptions={loadProjectSprintJSONOptions}
                              additional={{
                                page: 1,
                                project_id: projectID,
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Pakai jika kerjaan ada di skema jadwal
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
                          <FormControl isloading={isload}>
                            <SelectAsync
                              isClearable
                              placeholder={`Default: ${task?.data.project_name}`}
                              selectRef={field.ref}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e);
                                form.setValue("sprint", null);
                                form.setValue("task_for", null);
                                // @ts-expect-error gapapa gan error
                                form.setValue("date", null);
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
                        <FormControl isloading={isload}>
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
          <Button disabled={update.isPending}>
            {update.isPending ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UpdateTaskProject;
