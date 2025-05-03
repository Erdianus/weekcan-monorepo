"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { k } from "@hktekno/api";
import { SelectAsync } from "@hktekno/ui/components/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { Button } from "@hktekno/ui/components/ui/button";
import { DatePicker } from "@hktekno/ui/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@hktekno/ui/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@hktekno/ui/components/ui/form";
import { Input } from "@hktekno/ui/components/ui/input";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { Textarea } from "@hktekno/ui/components/ui/textarea";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import { date4Y2M2D } from "@hktekno/ui/lib/date";
import { loadItemOptions } from "@hktekno/ui/lib/select";
import { shortName } from "@hktekno/ui/lib/utils";
import { useState } from "react";

const stockFormSchema = z.object({
  item: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { invalid_type_error: "Tolong Pilih Item" },
  ),
  qty: z.coerce.number().min(1, "Tolong Isi Jumlah"),
  ket: z.string(),
  date: z
    .date({
      required_error: "Tolong Pilih Tanggal Barang Kadaluarsa",
      invalid_type_error: "Tolong Isi Tanggal Barang Expired",
    })
    .optional(),
});

const AddStock = ({ warehouse_id }: { warehouse_id: string }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof stockFormSchema>>({
    resolver: zodResolver(stockFormSchema),
    values: {
      qty: 1,
      ket: "-",
      date: undefined,
      // @ts-expect-error gapapa gan
      item: null,
    },
  });
  const client = useQueryClient();
  const add = k.inventory.warehouse.stock.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      setOpen(false);
      form.reset();
      await client.invalidateQueries({
        queryKey: k.inventory.warehouse.stock.all.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"icon"}>
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Stock</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit((v) => {
                add.mutate({
                  data: {
                    qty: v.qty,
                    date: date4Y2M2D(v.date),
                    ket: v.ket,
                    warehouse_id,
                    item_id: v.item.value,
                  },
                });
              })}
            >
              <div>
                <FormField
                  control={form.control}
                  name={`item`}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Item</FormLabel>
                      <FormControl>
                        <SelectAsync
                          menuPortalTarget={
                            typeof window !== "undefined" ? document.body : null
                          }
                          value={field.value}
                          onChange={field.onChange}
                          loadOptions={loadItemOptions}
                          placeholder="Pilih Item"
                          additional={{ page: 1, not_in_warehouse: warehouse_id }}
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
                  name={`qty`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Masukkan Jumlah Stock"
                          type="number"
                          min="1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`date`}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="">Tanggal Kadaluarsa</FormLabel>
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
              </div>
              <div>
                <FormField
                  control={form.control}
                  name={`ket`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Keterangan</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Masukkan Keterangan"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">
                {add.isPending ? <Spinner /> : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

const SingleWarehouse = ({ id }: { id: string }) => {
  const { data: warehouse } = k.inventory.warehouse.single.useQuery({
    variables: { id },
  });

  if (!warehouse)
    return (
      <div>
        <Skeleton className="mb-1 h-8 w-32" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-16 " />
        </div>
      </div>
    );

  return (
    <div className="flex justify-between">
      <div>
        <H3>{warehouse.data.name}</H3>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Avatar className="h-8 w-8">
            <AvatarImage src={warehouse.data.company.picture_link} />
            <AvatarFallback>
              {shortName(warehouse.data.company.company_name)}
            </AvatarFallback>
          </Avatar>
          <div className="">{warehouse.data.company.company_name}</div>
        </div>
      </div>
      <AddStock warehouse_id={id} />
    </div>
  );
};

export default SingleWarehouse;
