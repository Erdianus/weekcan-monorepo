"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { inferVariables, k } from "@hktekno/api";
import { Select } from "@hktekno/ui/components/select";
import { Button } from "@hktekno/ui/components/ui/button";
import { DatePicker } from "@hktekno/ui/components/ui/date-picker";
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
import {
  RadioGroup,
  RadioGroupItem,
} from "@hktekno/ui/components/ui/radio-group";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { date4Y2M2D, dayjs } from "@hktekno/ui/lib/date";

const religions = [
  "Islam",
  "Kristen",
  "Katolik",
  "Buddha",
  "Hindu",
  "Konghucu",
].map((v) => ({ label: v, value: v }));

const genders = [
  {
    label: "Laki-laki",
    value: "L",
  },
  {
    label: "Perempuan",
    value: "P",
  },
];

const formSchema = z.object({
  nik: z.string().min(1, "Tolong Isi NIK"),
  full_name: z.string().min(1, "Tolong Isi Nama Lengkap"),
  date: z.date({
    required_error: "Tolong Pilih Tanggal Lahir",
    invalid_type_error: "Tolong Isi Tanggal Lahir",
  }),
  address: z.string().min(1, "Tolong Isi Alamat"),
  no_telp: z.string().min(1, "Tolong Isi Nomor Telepon/HP"),
  gender: z.string().min(1, "Tidak Boleh Non-Binary"),
  religion: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    {
      required_error: "Tidak Boleh Atheis",
      invalid_type_error: "Tidak Boleh Atheis",
    },
  ),
});

type FormSchema = z.infer<typeof formSchema>;

const date = new Date();

export const DataEmployeeForm = ({
  user_id,
  backAfterSuccess = true,
}: {
  user_id: string | number;
  backAfterSuccess?: boolean;
}) => {
  const router = useRouter();
  const { data: user } = k.user.single.useQuery({ variables: { id: user_id } });
  const isUpdate = !!user?.data.data_employee;

  const client = useQueryClient();
  const create = k.user.data.create.useMutation({
    onSuccess: async ({ message }) => {
      await client.invalidateQueries({
        queryKey: k.user.single.getKey({ id: user_id }),
      });
      toast.success(message);
      if (backAfterSuccess) {
        router.back();
      }
    },
    onError: ({ message }) => toast.error(message),
  });

  const update = k.user.data.update.useMutation({
    onSuccess: async ({ message }) => {
      await client.invalidateQueries({
        queryKey: k.user.single.getKey({ id: user_id }),
      });
      toast.success(message);
      if (backAfterSuccess) {
        router.back();
      }
    },
    onError: ({ message }) => toast.error(message),
  });

  const isPending = update.isPending || create.isPending;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    // @ts-expect-error gapapa gan
    values: !user?.data.data_employee
      ? {
          nik: "",
          full_name: "",
          date,
          address: "",
          no_telp: "",
          gender: "",
          // @ts-ignore gapgap gan
          religion: null,
        }
      : {
          ...user?.data.data_employee,
          date: dayjs(user?.data.data_employee.date_of_birth).toDate(),
          religion: {
            label: user?.data.data_employee.religion,
            value: user?.data.data_employee.religion,
          },
        },
  });
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((value) => {
            const data: inferVariables<typeof k.user.data.create>["data"] = {
              ...value,
              date_of_birth: date4Y2M2D(value.date),
              user_id,
              religion: value.religion.value,
              gender: value.gender,
            };

            if (isUpdate) {
              update.mutate({
                data,
              });
              return;
            }
            create.mutate({
              data,
            });
          })}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              name="nik"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIK</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Isi NIK" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="full_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Isi Nama Lengkap" />
                  </FormControl>
                  <FormDescription>
                    Bisa diisi dengan nama lengkap + gelar
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="">Tanggal Lahir</FormLabel>
                  <FormControl>
                    <DatePicker
                      className="flex w-full"
                      value={field.value}
                      defaultMonth={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Isi Alamat" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              name="no_telp"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Telp/HP</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Isi No. Telp/HP" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="religion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agama</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      instanceId={"religion-select"}
                      options={religions}
                      placeholder="Apa Agamamu?"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-8"
                    >
                      {genders.map((r) => (
                        <FormItem
                          key={`radioo-${r.value}`}
                          className="flex items-center gap-2 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={r.value} />
                          </FormControl>
                          <FormLabel>{r.label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} type="submit">
            Submit
            {isPending && <Spinner />}
          </Button>
        </form>
      </Form>
    </>
  );
};
