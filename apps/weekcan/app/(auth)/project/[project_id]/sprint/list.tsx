'use client';

import { ReactNode, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import FullCalendar from '@fullcalendar/react';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import k, { useQueryClient } from '@repo/api/kit';
import { sprintFormSchema } from '@repo/api/router/project/sprint/schema';
import { Button } from '@repo/ui/components/ui/button';
import { DateRangePicker } from '@repo/ui/components/ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@repo/ui/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
import Spinner from '@repo/ui/components/ui/spinner';
import { date4Y2M2D } from '@repo/ui/lib/date';
import useMediaQuery from '@repo/ui/lib/hooks/useMediaQuery';
import { optionsTime } from '@repo/ui/lib/select';

const sprintForm = sprintFormSchema.omit({ start_date: true, end_date: true }).extend({
  date: z.object(
    {
      from: z.date({ required_error: 'Tolong Pilih Tanggal' }),
      to: z.date().optional(),
    },
    { invalid_type_error: 'Tolong Pilih Tanggal' },
  ),
  time: z.string(),
});

function ResponsiveDialogDrawer({
  open,
  onOpenChange,
  children,
  title,
}: {
  open: boolean;
  onOpenChange?: ((open: boolean) => void) | undefined;
  children: ReactNode;
  title?: string;
}) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}

const CreateSprint = () => {
  const params = useParams<{ project_id: string }>();
  const form = useForm<z.infer<typeof sprintForm>>({
    resolver: zodResolver(sprintForm),
    values: {
      title: '',
      // @ts-ignore
      date: null,
      time: '_',
      project_id: params.project_id,
    },
  });

  const client = useQueryClient();
  const create = k.project.sprint.create.useMutation({
    onSuccess: async ({ message }) => {
      await client.invalidateQueries({ queryKey: k.project.sprint.all.getKey() });
      toast.success(message);
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((data) => {
            const time = data.time === '_' ? '00:00:01' : `${data.time}:00`;
            const end_date = data.date.to ?? data.date.from;

            create.mutate({
              data: {
                title: data.title,
                start_date: `${date4Y2M2D(data.date.from)} ${time}`,
                end_date: `${date4Y2M2D(end_date)} ${time}`,
                project_id: data.project_id,
              },
            });
          })}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Contoh: Hari-H" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="time"
            render={({ field }) => (
              <FormItem className="col-span-2 flex flex-col gap-2">
                <FormLabel>Waktu</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Waktu (Kosongkan jika tidak ada)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={'_'}>Tidak Pakai Waktu</SelectItem>
                    {optionsTime().map((v) => (
                      <SelectItem key={v.value} value={v.value}>
                        {v.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full">{create.isPending ? <Spinner /> : 'Submit'}</Button>
        </form>
      </Form>
    </>
  );
};

const ListSprint = ({ project_id }: { project_id: string }) => {
  const [formData, setFormData] = useState({
    open: false,
    id: 0,
    title: '',
  });
  const { data: sprints } = k.project.sprint.all.useQuery({ variables: { project_id } });

  const events = useMemo<EventSourceInput | undefined>(() => {
    if (!sprints) return undefined;

    return sprints.data.map((sprint) => {
      return {
        id: `${sprint.id}`,
        title: sprint.title,
        start: dayjs(sprint.start_date).format('YYYY-MM-DDTHH:mm:ss'),
        end: dayjs(sprint.end_date).format('YYYY-MM-DDTHH:mm:ss'),
      };
    });
  }, [sprints]);

  return (
    <>
      <ResponsiveDialogDrawer
        open={formData.open}
        onOpenChange={(open) => setFormData((o) => ({ ...o, open }))}
        title="Buat Jadwal Baru"
      >
        {formData.id === 0 && <CreateSprint />}
      </ResponsiveDialogDrawer>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, multiMonthPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridWeek,dayGridDay,dayGridMonth,multiMonthYear,listWeek', // user can switch between the two
        }}
        events={events}
        eventClick={(e) => {
          console.log('event', e);
        }}
        dateClick={(e) => {
          setFormData((o) => ({ ...o, open: true }));
        }}
      />
    </>
  );
};

export default ListSprint;
