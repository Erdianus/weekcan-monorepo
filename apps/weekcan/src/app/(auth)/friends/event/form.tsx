"use client";

import type { UseFormReturn } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import { Select, SelectAsync } from "@hktekno/ui/components/select";
import { Button } from "@hktekno/ui/components/ui/button";
import { DateRangePicker } from "@hktekno/ui/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@hktekno/ui/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@hktekno/ui/components/ui/drawer";
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
import { date4Y2M2D, dayjs } from "@hktekno/ui/lib/date";
import useMediaQuery from "@hktekno/ui/lib/hooks/useMediaQuery";
import {
  loadCityOptions,
  loadProvinceOptions,
  loadUserOptions,
} from "@hktekno/ui/lib/select";
import useUserStore from "@hktekno/ui/lib/store/useUserStore";

import { currEventAtom, openAtom } from "./state";

const formSchema = z.object({
  name: z.string().min(1, "Tolong Isi Nama Event"),
  event_type: z.string().min(1, "Tolong Isi Tipe Event"),
  pic: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .array()
    .min(1, "Tolong Pilih PIC"),
  pic_design: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .array()
    .min(1, "Tolong Pilih PIC Design"),
  date: z.object(
    {
      from: z.date({ required_error: "Tolong Pilih Tanggal" }),
      to: z.date().optional(),
    },
    { required_error: "Tolong Pilih Tanggal" },
  ),
  venue: z.string().min(1, "Tolong Isi Nama Venue"),
  client: z.string().min(1, "Tolong Isi Nama Client"),
  province: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { invalid_type_error: "Tolong Pilih Provinsi" },
  ),
  city: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { invalid_type_error: "Tolong Pilih Kota" },
  ),
  status: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { invalid_type_error: "Tolong Pilih Status" },
  ),
  tax_type: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { invalid_type_error: "Tolong Pilih Tipe Pajak" },
  ),
});

type FormSchema = z.infer<typeof formSchema>;

const status = [
  "Pitching Concept",
  "On Going",
  "In Preparation",
  "Done",
  "Pending",
  "Cancel",
].map((v) => ({ label: v, value: v }));

const taxes = [
  {
    label: "PPn 11%",
    value: "1",
  },
  {
    label: "PPn 11% + PPh 2%",
    value: "2",
  },
  {
    label: "Tidak Ada Pajak",
    value: "3",
  },
];

const FormChild = ({ form }: { form: UseFormReturn<FormSchema> }) => {
  const friends_id = useUserStore((s) => s.friends_id);
  const [open, setOpen] = useAtom(openAtom);
  const [currEvent, setCurrEvent] = useAtom(currEventAtom);
  const client = useQueryClient();
  const create = k.event.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      form.reset();
      setOpen(false);
      setCurrEvent(undefined);
      await client.invalidateQueries({ queryKey: k.event.all.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });

  const update = k.event.update.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      form.reset();
      setOpen(false);
      setCurrEvent(undefined);
      await client.invalidateQueries({ queryKey: k.event.all.getKey() });
    },
    onError: ({ message }) => toast.error(message),
  });

  const isload = create.isPending || update.isPending;
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            console.log(data);
            if (currEvent) {
              update.mutate({
                slug: currEvent.slug,
                data: {
                  ...data,
                  status: data.status.value,
                  province: data.province.label,
                  city: data.city.label,
                  start_date: date4Y2M2D(data.date.from),
                  end_date: data.date.to
                    ? date4Y2M2D(data.date.to)
                    : date4Y2M2D(data.date.from),
                  pic: data.pic.map((c) => c.value),
                  pic_design: data.pic_design.map((c) => c.value),
                  tax_type: data.tax_type.value,
                },
              });

              return;
            }
            create.mutate({
              data: {
                ...data,
                status: data.status.value,
                province: data.province.label,
                city: data.city.label,
                start_date: date4Y2M2D(data.date.from),
                end_date: data.date.to
                  ? date4Y2M2D(data.date.to)
                  : date4Y2M2D(data.date.from),
                pic: data.pic.map((c) => c.value),
                pic_design: data.pic_design.map((c) => c.value),
                tax_type: data.tax_type.value,
              },
            });
          })}
        >
          <div className="mb-3 max-h-96 space-y-4 overflow-y-auto p-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Event</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Contoh: Konser Sheila on 7"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="event_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Singkat</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Contoh: Festival" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="pic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PIC</FormLabel>
                    <FormControl>
                      <SelectAsync
                        isMulti
                        menuPortalTarget={
                          typeof window !== "undefined" ? document.body : null
                        }
                        loadOptions={loadUserOptions}
                        placeholder="Pilih PIC"
                        selectRef={field.ref}
                        value={field.value}
                        onChange={field.onChange}
                        additional={{
                          page: 1,
                          company_id: [`${friends_id ?? ""}`],
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pic_design"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PIC Design</FormLabel>
                    <FormControl>
                      <SelectAsync
                        isMulti
                        loadOptions={loadUserOptions}
                        menuPortalTarget={
                          typeof window !== "undefined" ? document.body : null
                        }
                        placeholder="Pilih PIC Design"
                        selectRef={field.ref}
                        value={field.value}
                        onChange={field.onChange}
                        additional={{
                          page: 1,
                          company_id: [`${friends_id ?? ""}`],
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Contoh: GOR Kadrie Oening"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Contoh: Dispar" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provinsi</FormLabel>
                    <FormControl>
                      <SelectAsync
                        menuPortalTarget={
                          typeof window !== "undefined" ? document.body : null
                        }
                        loadOptions={loadProvinceOptions}
                        selectRef={field.ref}
                        value={field.value}
                        additional={{
                          page: 1,
                        }}
                        onChange={(e) => {
                          field.onChange({
                            label: e?.label,
                            value: `${e?.value ?? ""}`,
                          });
                          // @ts-expect-error sengaja biar error
                          form.setValue("city", null);
                        }}
                        placeholder="Pilih Provinsi"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kota</FormLabel>
                    <FormControl>
                      <SelectAsync
                        menuPortalTarget={
                          typeof window !== "undefined" ? document.body : null
                        }
                        cacheUniqs={[form.watch("province")]}
                        loadOptions={loadCityOptions}
                        placeholder="Pilih Kota"
                        selectRef={field.ref}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange({
                            label: e?.label,
                            value: `${e?.value ?? ""}`,
                          });
                        }}
                        isDisabled={!form.watch("province")}
                        additional={{
                          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                          province_id: form.watch("province")?.value ?? "",
                          page: 1,
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        menuPortalTarget={
                          typeof window !== "undefined" ? document.body : null
                        }
                        options={status}
                        placeholder="Pilih Status"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tax_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe Pajak</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        menuPortalTarget={
                          typeof window !== "undefined" ? document.body : null
                        }
                        options={taxes}
                        placeholder="Pilih Tipe Pajak"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button disabled={isload} type="submit">
            <span>Submit</span> {isload && <Spinner />}
          </Button>
        </form>
      </Form>
    </>
  );
};

export function FormEvent() {
  console.log("formevent");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, onOpenChange] = useAtom(openAtom);
  const [currEvent, setCurrEvent] = useAtom(currEventAtom);

  const title = currEvent ? "Update Event" : "Buat Event";

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      name: "",
      event_type: "",
      pic: [],
      pic_design: [],
      // @ts-expect-error sengaja biar error
      date: undefined,
      venue: "",
      client: "",
      // @ts-expect-error sengaja biar error
      province: null,
      // @ts-expect-error sengaja biar error
      city: null,
      // @ts-expect-error sengaja biar error
      status: null,
      // @ts-expect-error sengaja biar error
      tax_type: null,
    },
  });

  useEffect(() => {
    if (currEvent) {
      /* form.setValue("name", currEvent.name);
      form.setValue("event_type", currEvent.event_type); */
      form.reset({
        name: currEvent.name,
        event_type: currEvent.event_type,
        pic: currEvent.all_data_pic.map((c) => ({
          label: c.name,
          value: `${c.id}`,
        })),
        pic_design: currEvent.all_data_pic_design.map((c) => ({
          label: c.name,
          value: `${c.id}`,
        })),
        date: {
          from: dayjs(currEvent.start_date).toDate(),
          to: currEvent.end_date
            ? dayjs(currEvent.end_date).toDate()
            : undefined,
        },
        venue: currEvent.venue,
        client: currEvent.client,
        province: {
          value: `${currEvent.province}`,
          label: `${currEvent.province}`,
        },
        city: {
          value: `${currEvent.city}`,
          label: `${currEvent.city}`,
        },
        status: {
          value: currEvent.status,
          label: currEvent.status,
        },
        tax_type: {
          label: taxes[currEvent?.tax_type - 1]?.label ?? "",
          value: `${currEvent.tax_type}`,
        },
      });
    } else {
      form.reset({
        name: "",
        event_type: "",
        pic: [],
        pic_design: [],
        date: undefined,
        venue: "",
        client: "",
        // @ts-expect-error sengaja biar error
        province: null,
        // @ts-expect-error sengaja biar error
        city: null,
        // @ts-expect-error sengaja biar error
        status: null,
        // @ts-expect-error sengaja biar error
        tax_type: null,
      });
    }
  }, [currEvent]);

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={(o) => {
          if (!o) {
            onOpenChange(o);
            form.reset();
            setCurrEvent(undefined);
          }
        }}
      >
        <DialogContent className="sm:max-w-[75%]">
          <DialogTitle>{title}</DialogTitle>
          {/* <DialogDescription>{props.description}</DialogDescription> */}
          <FormChild form={form} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          onOpenChange(o);
          form.reset();
          setCurrEvent(undefined);
        }
      }}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {/* <DrawerDescription>{props.description}</DrawerDescription> */}
        </DrawerHeader>
        <div className="p-4">
          <FormChild form={form} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
