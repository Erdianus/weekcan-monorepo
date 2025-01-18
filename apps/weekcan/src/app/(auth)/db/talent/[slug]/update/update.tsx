"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Plus, XCircle } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import type { inferData } from "@hktekno/api";
import { k } from "@hktekno/api";
import { contactItems } from "@hktekno/api/routers/hkdb/talent/schema";
import { Select, SelectAsync } from "@hktekno/ui/components/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@hktekno/ui/components/ui/accordion";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { Button } from "@hktekno/ui/components/ui/button";
import { DatePicker } from "@hktekno/ui/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@hktekno/ui/components/ui/form";
import { Input } from "@hktekno/ui/components/ui/input";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { Textarea } from "@hktekno/ui/components/ui/textarea";
import { date4Y2M2D } from "@hktekno/ui/lib/date";
import {
  loadDBCategoryOptions,
  loadDBSkillOptions,
  optionsYears,
} from "@hktekno/ui/lib/select";

const formSchema = z.object({
  name: z.string().min(1, "Tolong Isi Nama"),
  about: z.string().min(1, "Tolong Isi Tentang"),
  category: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { invalid_type_error: "Tolong Pilih Kategori" },
  ),
  contact: z
    .object({
      id: z.union([z.string(), z.number()]),
      type: z.string().min(1, "Tolong Pilih Tipe Kontak"),
      /* type: z.object(
        {
          label: z.string(),
          value: z.string(),
        },
        { invalid_type_error: "Tolong Pilih Tipe Kontak" },
      ), */
      contact: z.string().min(1, "Tolong Isi yaa"),
    })
    .array(),
  skill: z.string().array(),
  experience: z
    .object({
      id: z.union([z.string(), z.number()]),
      title: z.string().min(1, "Tolong Isi Judul Pengalaman"),
      from: z.string().min(1, "Tolong Pilih Tahun Mulai Pengalaman"),
      to: z.string().min(1, "Tolong Pilih Tahun Berakhir Pengalaman"),
      detail: z.string().min(1, "Tolong Isi Detail Pengalaman"),
    })
    .array(),
  education: z
    .object({
      id: z.union([z.string(), z.number()]),
      title: z.string().min(1, "Tolong Isi Judul Pengalaman"),
      from: z.string().min(1, "Tolong Pilih Tahun Mulai Pengalaman"),
      to: z.string().min(1, "Tolong Pilih Tahun Berakhir Pengalaman"),
      detail: z.string().min(1, "Tolong Isi Detail Pengalaman"),
    })
    .array()
    .optional(),
  birth_date: z.date().optional(),
});

export function UpdateTalent({
  slug,
  defaultValue,
}: {
  slug: string;
  defaultValue: inferData<typeof k.hkdb.talent.single>["data"] & {
    skills: { label: string; value: string }[];
  };
}) {
  const router = useRouter();

  const client = useQueryClient();
  const update = k.hkdb.talent.update.useMutation({
    onSuccess: async ({ message }) => {
      await client.invalidateQueries({ queryKey: k.hkdb.talent.all.getKey() });
      toast.success(message);
      router.push("/db");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: defaultValue.name,
      category: {
        label: defaultValue.category.name,
        value: `${defaultValue.category.id}`,
      },
      about: defaultValue.about,
      birth_date: dayjs(defaultValue.birth_date).toDate(),
      skill: defaultValue.skill.map((skill) => `${skill.id}`),
      contact: defaultValue.contact.map((v) => ({ ...v, contact: v.contacts })),
      experience: defaultValue.experience,
      education: defaultValue.education,
    },
  });

  const {
    fields: fieldsContact,
    append: addContact,
    remove: delContact,
  } = useFieldArray({
    control: form.control,
    name: "contact",
  });

  const {
    fields: fieldsExperience,
    append: addExperience,
    remove: delExperience,
  } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const {
    fields: fieldsEducation,
    append: addEducation,
    remove: delEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });

  return (
    <>
      <Form {...form}>
        <form
          className="mb-10 space-y-4"
          onSubmit={form.handleSubmit((data) => {
            console.log(data);
            update.mutate({
              slug,
              data: {
                ...data,
                category_id: data.category.value,
                birth_date: date4Y2M2D(data.birth_date),
              },
            });
          })}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Kategori</FormLabel>
                  <FormControl>
                    <SelectAsync
                      loadOptions={loadDBCategoryOptions}
                      selectRef={field.ref}
                      value={field.value}
                      additional={{
                        page: 1,
                      }}
                      onChange={field.onChange}
                      placeholder="Pilih Kategori"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Nama</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Contoh: Yuju" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Deskripsi Singkat</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Contoh: Main Vocal" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birth_date"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="skill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keahlian</FormLabel>
                  <FormControl>
                    <SelectAsync
                      isMulti
                      loadOptions={loadDBSkillOptions}
                      defaultValue={defaultValue.skills}
                      selectRef={field.ref}
                      // value={field.value}
                      onChange={(v) => {
                        const value = v.map((vv) => vv.value ?? "");
                        field.onChange(value);
                      }}
                      placeholder="Pilih Keahlian"
                      additional={{
                        page: 1,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    Kontak
                    {fieldsContact.length && (
                      <Badge>{fieldsContact.length}</Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <Button
                    type="button"
                    variant={"secondary"}
                    className="mb-2"
                    onClick={() => {
                      addContact({
                        id: crypto.randomUUID(),
                        // @ts-expect-error gapapa gan error
                        type: null,
                        contact: "",
                      });
                    }}
                  >
                    <Plus />
                    <span>Tambah Kontak</span>
                  </Button>
                  {fieldsContact.map((contact, i) => {
                    return (
                      <div
                        key={contact.id}
                        className="relative mb-4 grid grid-cols-1 gap-4 rounded-lg border p-2 px-2 sm:grid-cols-2"
                      >
                        <Button
                          size={"icon"}
                          variant={"ghost"}
                          type="button"
                          className="absolute -right-2 -top-4 rounded-full"
                          onClick={() => {
                            delContact(i);
                          }}
                        >
                          <XCircle
                            size={18}
                            className="text-destructive-foreground"
                          />
                        </Button>
                        <FormField
                          control={form.control}
                          name={`contact.${i}.type`}
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormLabel>Tipe</FormLabel>
                                <FormControl>
                                  <Select
                                    options={contactItems}
                                    defaultValue={{
                                      value: field.value,
                                      label: field.value,
                                    }}
                                    // value={field.value}
                                    onChange={(e) => {
                                      field.onChange(e?.value);
                                    }}
                                    placeholder="Pilih Tipe Kontak"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={form.control}
                          name={`contact.${i}.contact`}
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormLabel>Nomor/Akun/Link</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Isi Kontak" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    Pengalaman
                    {fieldsExperience.length && (
                      <Badge>{fieldsExperience.length}</Badge>
                    )}
                  </div>{" "}
                </AccordionTrigger>
                <AccordionContent>
                  <Button
                    type="button"
                    variant={"secondary"}
                    className="mb-2"
                    onClick={() => {
                      addExperience({
                        id: crypto.randomUUID(),
                        from: "",
                        to: "",
                        title: "",
                        detail: "",
                      });
                    }}
                  >
                    <Plus />
                    <span>Tambah Pengalaman</span>
                  </Button>
                  {fieldsExperience.map((exp, i) => {
                    return (
                      <div
                        key={exp.id}
                        className="relative mb-4 space-y-4 rounded-lg border p-2 px-2"
                      >
                        <Button
                          size={"icon"}
                          variant={"ghost"}
                          type="button"
                          className="absolute -right-2 -top-4 rounded-full"
                          onClick={() => {
                            delExperience(i);
                          }}
                        >
                          <XCircle
                            size={18}
                            className="text-destructive-foreground"
                          />
                        </Button>

                        <div className="">
                          <FormField
                            control={form.control}
                            name={`experience.${i}.title`}
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel>Nama Pengalaman</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Contoh: Les KUMON"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name={`experience.${i}.from`}
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel>Tahun Mulai</FormLabel>
                                  <FormControl>
                                    <Select
                                      options={optionsYears()}
                                      defaultValue={{
                                        label: field.value,
                                        value: field.value,
                                      }}
                                      // value={field.value}
                                      onChange={(e) => {
                                        field.onChange(e?.value);
                                      }}
                                      placeholder="Tahun Mulai"
                                      className="w-full"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                          <FormField
                            control={form.control}
                            name={`experience.${i}.to`}
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel>Tahun Berakhir</FormLabel>
                                  <FormControl>
                                    <Select
                                      className="w-full"
                                      options={optionsYears()}
                                      defaultValue={{
                                        label: field.value,
                                        value: field.value,
                                      }}
                                      // value={field.value}
                                      onChange={(e) => {
                                        field.onChange(e?.value);
                                      }}
                                      placeholder="Tahun Berakhir"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="">
                          <FormField
                            control={form.control}
                            name={`experience.${i}.detail`}
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel>Detail</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      placeholder="Isi Detail"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    Pendidikan
                    {fieldsEducation.length && (
                      <Badge>{fieldsEducation.length}</Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Button
                    type="button"
                    variant={"secondary"}
                    className="mb-2"
                    onClick={() => {
                      addEducation({
                        id: crypto.randomUUID(),
                        from: "",
                        to: "",
                        title: "",
                        detail: "",
                      });
                    }}
                  >
                    <Plus />
                    <span>Tambah Pendidikan</span>
                  </Button>
                  {fieldsEducation.map((edu, i) => {
                    return (
                      <div
                        key={edu.id}
                        className="relative mb-4 space-y-4 rounded-lg border p-2 px-2"
                      >
                        <Button
                          size={"icon"}
                          variant={"ghost"}
                          type="button"
                          className="absolute -right-2 -top-4 rounded-full"
                          onClick={() => {
                            delEducation(i);
                          }}
                        >
                          <XCircle
                            size={18}
                            className="text-destructive-foreground"
                          />
                        </Button>

                        <div className="">
                          <FormField
                            control={form.control}
                            name={`education.${i}.title`}
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel>Nama Pendidikan</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Contoh: Strata 1"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name={`education.${i}.from`}
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel>Tahun Mulai</FormLabel>
                                  <FormControl>
                                    <Select
                                      options={optionsYears()}
                                      defaultValue={{
                                        label: field.value,
                                        value: field.value,
                                      }}
                                      // value={field.value}
                                      onChange={(e) => {
                                        field.onChange(e?.value);
                                      }}
                                      placeholder="Tahun Mulai"
                                      className="w-full"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                          <FormField
                            control={form.control}
                            name={`education.${i}.to`}
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel>Tahun Berakhir</FormLabel>
                                  <FormControl>
                                    <Select
                                      className="w-full"
                                      options={optionsYears()}
                                      defaultValue={{
                                        label: field.value,
                                        value: field.value,
                                      }}
                                      // value={field.value}
                                      onChange={(e) => {
                                        field.onChange(e?.value);
                                      }}
                                      placeholder="Tahun Berakhir"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="">
                          <FormField
                            control={form.control}
                            name={`education.${i}.detail`}
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel>Detail Pendidikan</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      placeholder="Isi Detail Pendidikan"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <Button type="submit" disabled={update.isPending}>
            <span>Submit</span> {update.isPending && <Spinner />}
          </Button>
        </form>
      </Form>
    </>
  );
}
