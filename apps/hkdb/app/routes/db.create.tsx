import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Chip,
  DatePicker,
  Divider,
  Input,
  ScrollShadow,
  Select,
  SelectItem,
  Skeleton,
  Textarea,
} from "@nextui-org/react";
import { useNavigate } from "@remix-run/react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Search, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { z } from "zod";

import { k } from "~/api";
import { contactItems } from "~/api/archive/talent/schema";
import { AsyncSelectCategory } from "~/components/ui/async-select";
import { Flashlist } from "~/components/ui/flashlist";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Loading } from "~/components/ui/loading";
import { ContactIcon } from "~/components/ui/sosmed-icon";
import { cn, yearItems } from "~/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, "Tolong Isi Nama"),
  about: z.string().min(1, "Tolong Isi Tentang"),
  category_id: z.string({ invalid_type_error: "Tolong Pilih Kategori" }),
  contact: z
    .object({
      key: z.string(),
      type: z.string(),
      contact: z.string().min(1, "Tolong Isi yaa"),
    })
    .array(),
  skill: z.string().array(),
  experience: z
    .object({
      key: z.string(),
      title: z.string().min(1, "Tolong Isi Judul Pengalaman"),
      from: z.string().min(1, "Tolong Pilih Tahun Mulai Pengalaman"),
      to: z.string().min(1, "Tolong Pilih Tahun Berakhir Pengalaman"),
      detail: z.string().min(1, "Tolong Isi Detail Pengalaman"),
    })
    .array(),
  education: z
    .object({
      key: z.string(),
      title: z.string().min(1, "Tolong Isi Judul Pengalaman"),
      from: z.string().min(1, "Tolong Pilih Tahun Mulai Pengalaman"),
      to: z.string().min(1, "Tolong Pilih Tahun Berakhir Pengalaman"),
      detail: z.string().min(1, "Tolong Isi Detail Pengalaman"),
    })
    .array(),
  birth_date: z.any(),
});

export default function Page() {
  const navigate = useNavigate();
  const [searchSkill, setSearchSkill] = useState("");
  const [debounceSearchSkill] = useDebounce(searchSkill, 600);
  const { data: skills, isLoading: loadSkills } =
    k.archive.skill.infinite.useInfiniteQuery({
      variables: { searchSkill: debounceSearchSkill },
    });

  const client = useQueryClient();
  const create = k.archive.talent.create.useMutation({
    onSuccess: async ({ message }) => {
      await client.invalidateQueries({
        queryKey: k.archive.talent.all.getKey(),
      });
      toast.success(message);
      navigate("/db");
    },
    onError: ({ message }) => toast.error(message),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: "",
      // @ts-expect-error gapapa gan
      category_id: null,
      contact: [],
      skill: [],
      experience: [],
      education: [],
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

  const skillsFlat = useMemo(
    () => skills?.pages.flatMap((v) => v.data),
    [skills?.pages],
  );

  console.log("rerender");

  return (
    <>
      <h2 className="mb-4 text-3xl font-bold">Tambah Data</h2>
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit((v) => {
            console.log(v);
            let birth_date = "";
            if (v.birth_date)
              birth_date = `${v.birth_date.year}-${v.birth_date.month}-${v.birth_date.day}`;

            create.mutate({
              data: {
                ...v,
                birth_date,
              },
            });
          })}
        >
          <FormField
            control={form.control}
            name="category_id"
            render={({ field, fieldState }) => (
              <AsyncSelectCategory
                fullWidth
                isRequired
                isClearable={false}
                variant="underlined"
                label="Kategori"
                selectedKey={field.value}
                onSelectionChange={field.onChange}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    isRequired
                    variant="underlined"
                    label={`Nama`}
                    onValueChange={field.onChange}
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    isRequired
                    variant="underlined"
                    label={`Tentang`}
                    onValueChange={field.onChange}
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birth_date"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <DatePicker
                    showMonthAndYearPickers
                    variant="underlined"
                    label={`Tanggal Lahir`}
                    value={field.value}
                    onChange={field.onChange}
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="mt-4">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">Keahlian</h3>
                {form.watch("skill").length > 0 && (
                  <Chip size="sm">{form.watch("skill").length}</Chip>
                )}
              </div>
              <Divider className="flex-1" />
              <Input
                onChange={(e) => setSearchSkill(e.target.value)}
                startContent={<Search />}
                placeholder="Cari Keahlian..."
                className="w-max"
              />
            </div>
            <ScrollShadow className="max-h-80">
              <FormField
                control={form.control}
                name="skill"
                render={({ field, fieldState }) => {
                  const errMsg = fieldState.error?.message;
                  return (
                    <CheckboxGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      isInvalid={!!errMsg}
                      errorMessage={errMsg}
                      classNames={{
                        wrapper: "grid grid-cols-4 gap-2",
                      }}
                    >
                      <Flashlist
                        isloading={loadSkills}
                        loading={
                          <Loading keyname={`cbg-load`}>
                            <Skeleton className={"h-16 w-64 rounded-lg"} />
                          </Loading>
                        }
                      >
                        {skillsFlat?.map((skill) => (
                          <Checkbox
                            key={`cb-${skill.id}`}
                            value={`${skill.id}`}
                            classNames={{
                              base: cn(
                                "bg-content1 m-0 inline-flex w-full max-w-md",
                                "hover:bg-content2 items-center justify-start",
                                "cursor-pointer gap-2 rounded-lg border-2 border-transparent p-4",
                                "data-[selected=true]:border-primary",
                              ),
                              label: "w-full",
                            }}
                          >
                            {skill.name}
                          </Checkbox>
                        ))}
                      </Flashlist>
                    </CheckboxGroup>
                  );
                }}
              />
            </ScrollShadow>
          </div>

          <div className="mt-4">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">Kontak</h3>
                {form.watch("contact").length > 0 && (
                  <Chip size="sm">{form.watch("contact").length}</Chip>
                )}
              </div>
              <Divider className="flex-1" />
              <Button
                onClick={() => {
                  addContact({
                    key: crypto.randomUUID(),
                    type: "",
                    contact: "",
                  });
                }}
                type="button"
                variant="bordered"
                endContent={<Plus />}
                className="mb-4"
              >
                Tambah Kontak
              </Button>
            </div>
            <div className="">
              {fieldsContact.map((contact, i) => {
                return (
                  <div key={contact.key} className="flex items-center gap-4">
                    <FormField
                      control={form.control}
                      name={`contact.${i}.type`}
                      render={({ field, fieldState }) => {
                        const errMsg = fieldState.error?.message;
                        return (
                          <Select
                            variant={"underlined"}
                            selectedKeys={[field.value]}
                            onChange={(e) => field.onChange(e.target.value)}
                            items={contactItems}
                            label="Tipe Kontak"
                            isInvalid={!!errMsg}
                            errorMessage={errMsg}
                          >
                            {(type) => (
                              <SelectItem
                                key={type.value}
                                startContent={<ContactIcon type={type.value} />}
                              >
                                {type.label}
                              </SelectItem>
                            )}
                          </Select>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name={`contact.${i}.contact`}
                      render={({ field, fieldState }) => {
                        const errMsg = fieldState.error?.message;
                        return (
                          <Input
                            {...field}
                            variant={"underlined"}
                            label="Nomor/Akun/Link"
                            isInvalid={!!errMsg}
                            errorMessage={errMsg}
                          />
                        );
                      }}
                    />
                    <Button
                      onClick={() => {
                        delContact(i);
                      }}
                      radius="full"
                      size="sm"
                      type="button"
                      isIconOnly
                      variant="bordered"
                      color="danger"
                    >
                      <X />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">Pengalaman</h3>
                {form.watch("experience").length > 0 && (
                  <Chip size="sm">{form.watch("experience").length}</Chip>
                )}
              </div>
              <Divider className="flex-1" />
              <Button
                onClick={() => {
                  addExperience({
                    key: crypto.randomUUID(),
                    title: "",
                    detail: "",
                    from: "",
                    to: "",
                  });
                }}
                type="button"
                variant="bordered"
                endContent={<Plus />}
                className="mb-4"
              >
                Tambah Pengalaman
              </Button>
            </div>
            <div className="space-y-6">
              {fieldsExperience.map((experience, i) => (
                <div
                  key={`exp-${experience.key}`}
                  className="relative space-y-4 rounded-lg border border-border p-2"
                >
                  <Button
                    type="button"
                    onClick={() => {
                      delExperience(i);
                    }}
                    isIconOnly
                    radius="full"
                    size="sm"
                    className="group absolute -right-3 -top-3"
                    variant="ghost"
                    color={"danger"}
                  >
                    <X className="text-danger group-hover:text-white" />
                  </Button>
                  <FormField
                    control={form.control}
                    name={`experience.${i}.title`}
                    render={({ field, fieldState }) => {
                      const errMsg = fieldState.error?.message;
                      return (
                        <Input
                          {...field}
                          variant="bordered"
                          isInvalid={!!errMsg}
                          errorMessage={errMsg}
                          onValueChange={field.onChange}
                          label="Judul Pengalaman"
                        />
                      );
                    }}
                  />
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`experience.${i}.from`}
                      render={({ field, fieldState }) => {
                        const errMsg = fieldState.error?.message;
                        return (
                          <Autocomplete
                            variant="bordered"
                            isInvalid={!!errMsg}
                            errorMessage={errMsg}
                            defaultItems={yearItems()}
                            selectedKey={field.value}
                            onSelectionChange={field.onChange}
                            label="Tahun Mulai"
                          >
                            {(item) => (
                              <AutocompleteItem key={item.value}>
                                {item.label}
                              </AutocompleteItem>
                            )}
                          </Autocomplete>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name={`experience.${i}.to`}
                      render={({ field, fieldState }) => {
                        const errMsg = fieldState.error?.message;
                        return (
                          <Autocomplete
                            variant="bordered"
                            isInvalid={!!errMsg}
                            errorMessage={errMsg}
                            defaultItems={yearItems()}
                            selectedKey={field.value}
                            onSelectionChange={field.onChange}
                            label="Tahun Berakhir"
                          >
                            {(item) => (
                              <AutocompleteItem key={item.value}>
                                {item.label}
                              </AutocompleteItem>
                            )}
                          </Autocomplete>
                        );
                      }}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name={`experience.${i}.detail`}
                    render={({ field, fieldState }) => {
                      const errMsg = fieldState.error?.message;
                      return (
                        <Textarea
                          {...field}
                          variant="bordered"
                          isInvalid={!!errMsg}
                          errorMessage={errMsg}
                          onValueChange={field.onChange}
                          label="Detail"
                          placeholder="Isi Detail"
                        />
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">Pendidikan</h3>
                {fieldsEducation.length > 0 && (
                  <Chip size="sm">{fieldsEducation.length}</Chip>
                )}
              </div>
              <Divider className="flex-1" />
              <Button
                onClick={() => {
                  addEducation({
                    key: crypto.randomUUID(),
                    title: "",
                    detail: "",
                    from: "",
                    to: "",
                  });
                }}
                type="button"
                variant="bordered"
                endContent={<Plus />}
                className="mb-4"
              >
                Tambah Pendidikan
              </Button>
            </div>
            <div className="space-y-6">
              {fieldsEducation.map((education, i) => (
                <div
                  key={`exp-${education.key}`}
                  className="relative space-y-4 rounded-lg border border-border p-2"
                >
                  <Button
                    type="button"
                    onClick={() => {
                      delEducation(i);
                    }}
                    isIconOnly
                    radius="full"
                    size="sm"
                    className="group absolute -right-3 -top-3"
                    variant="ghost"
                    color={"danger"}
                  >
                    <X className="text-danger group-hover:text-white" />
                  </Button>
                  <FormField
                    control={form.control}
                    name={`education.${i}.title`}
                    render={({ field, fieldState }) => {
                      const errMsg = fieldState.error?.message;
                      return (
                        <Input
                          {...field}
                          variant="bordered"
                          isInvalid={!!errMsg}
                          errorMessage={errMsg}
                          onValueChange={field.onChange}
                          label="Nama Strata Pendidikan"
                        />
                      );
                    }}
                  />
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`education.${i}.from`}
                      render={({ field, fieldState }) => {
                        const errMsg = fieldState.error?.message;
                        return (
                          <Autocomplete
                            variant="bordered"
                            isInvalid={!!errMsg}
                            errorMessage={errMsg}
                            defaultItems={yearItems()}
                            selectedKey={field.value}
                            onSelectionChange={field.onChange}
                            label="Tahun Mulai"
                          >
                            {(item) => (
                              <AutocompleteItem key={item.value}>
                                {item.label}
                              </AutocompleteItem>
                            )}
                          </Autocomplete>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${i}.to`}
                      render={({ field, fieldState }) => {
                        const errMsg = fieldState.error?.message;
                        return (
                          <Autocomplete
                            variant="bordered"
                            isInvalid={!!errMsg}
                            errorMessage={errMsg}
                            defaultItems={yearItems()}
                            selectedKey={field.value}
                            onSelectionChange={field.onChange}
                            label="Tahun Berakhir"
                          >
                            {(item) => (
                              <AutocompleteItem key={item.value}>
                                {item.label}
                              </AutocompleteItem>
                            )}
                          </Autocomplete>
                        );
                      }}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name={`education.${i}.detail`}
                    render={({ field, fieldState }) => {
                      const errMsg = fieldState.error?.message;
                      return (
                        <Textarea
                          {...field}
                          variant="bordered"
                          isInvalid={!!errMsg}
                          errorMessage={errMsg}
                          onValueChange={field.onChange}
                          label="Detail"
                          placeholder="Isi Detail"
                        />
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button type="submit" color="primary" isLoading={create.isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
