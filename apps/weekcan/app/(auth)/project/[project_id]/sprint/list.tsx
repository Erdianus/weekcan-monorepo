'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { EventSourceInput } from '@fullcalendar/core';
import idLocale from '@fullcalendar/core/locales/id';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import k, { useQueryClient } from '@repo/api/kit';
import { sprintFormSchema } from '@repo/api/router/project/sprint/schema';
import { Button } from '@repo/ui/components/ui/button';
import { DateRangePicker } from '@repo/ui/components/ui/date-picker';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@repo/ui/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@repo/ui/components/ui/drawer';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/ui/tabs';
import { date4Y2M2D } from '@repo/ui/lib/date';
import useMediaQuery from '@repo/ui/lib/hooks/useMediaQuery';
import { optionsTime } from '@repo/ui/lib/select';
import useAlertStore from '@repo/ui/lib/store/useAlertStore';

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

const CreateSprint = ({
  date,
  onClose,
}: {
  date: { from: Date; to?: Date };
  onClose: () => void;
}) => {
  const params = useParams<{ project_id: string }>();
  const form = useForm<z.infer<typeof sprintForm>>({
    resolver: zodResolver(sprintForm),
    values: {
      title: '',
      // @ts-ignore
      date,
      time: '_',
      project_id: params.project_id,
    },
  });

  const client = useQueryClient();
  const { data: project } = k.project.single.useQuery({ variables: { id: params.project_id } });
  const create = k.project.sprint.create.useMutation({
    onSuccess: async ({ message }) => {
      await client.invalidateQueries({ queryKey: k.project.sprint.all.getKey() });
      toast.success(message);
      onClose();
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
                    defaultMonth={dayjs(date.from).toDate()}
                    disabled={{
                      before: dayjs(project?.data.start_date).toDate(),
                      after: dayjs(project?.data.end_date).toDate(),
                    }}
                    fromMonth={dayjs(project?.data.start_date).toDate()}
                    toMonth={dayjs(project?.data.end_date).toDate()}
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

const UpdateSprint = ({ id, onClose }: { id: string | number; onClose: () => void }) => {
  const alert = useAlertStore();

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
  const { data: project } = k.project.single.useQuery({ variables: { id: params.project_id } });
  const { data: sprint } = k.project.sprint.single.useQuery({ variables: { id } });
  const update = k.project.sprint.update.useMutation({
    onSuccess: async ({ message }) => {
      await client.invalidateQueries({ queryKey: k.project.sprint.all.getKey() });
      await client.invalidateQueries({ queryKey: k.project.sprint.single.getKey({ id }) });
      onClose();
      toast.success(message);
    },
    onError: ({ message }) => toast.error(message),
  });

  const del = k.project.sprint.delete.useMutation({
    onSuccess: async ({ message }) => {
      onClose();
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.project.sprint.all.getKey() });
      await client.invalidateQueries({ queryKey: k.project.sprint.single.getKey({ id }) });
    },
    onError: ({ message }) => toast.error(message),
  });

  const isLoad = !sprint;

  useEffect(() => {
    if (sprint) {
      form.reset({
        title: sprint.data.title,
        date: {
          from: dayjs(sprint.data.start_date).toDate(),
          to: dayjs(sprint.data.end_date).toDate(),
        },
        time:
          dayjs(sprint.data.start_date).format('HH:mm:ss') === '00:00:01'
            ? '_'
            : dayjs(sprint.data.start_date).format('HH:mm'),
        project_id: params.project_id,
      });
    }
  }, [sprint]);

  return (
    <>
      <Tabs defaultValue="detail">
        <TabsList>
          <TabsTrigger value="detail">Detail</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
        </TabsList>
        <TabsContent value="detail">
          <Button
            disabled={del.isPending}
            type="button"
            variant={'destructive'}
            onClick={() => {
              alert.setData({
                open: true,
                header: `Yakin ingin menghapus ${sprint?.data.title}`,
                desc: 'Jadwal yang sudah dihapus tidak dapat dikembalikan lagi',
                onConfirm: () => {
                  del.mutate({ id });
                },
              });
            }}
          >
            {del.isPending ? (
              <Spinner className="mr-2 h-4 w-4" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            Hapus
          </Button>
        </TabsContent>
        <TabsContent value="edit">
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit((data) => {
                const time = data.time === '_' ? '00:00:01' : `${data.time}:00`;
                const end_date = data.date.to ?? data.date.from;

                update.mutate({
                  id,
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
                    <FormControl isloading={isLoad}>
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
                    <FormControl isloading={isLoad}>
                      <DateRangePicker
                        defaultMonth={dayjs(sprint?.data.start_date).toDate()}
                        disabled={{
                          before: dayjs(project?.data.start_date).toDate(),
                          after: dayjs(project?.data.end_date).toDate(),
                        }}
                        fromMonth={dayjs(project?.data.start_date).toDate()}
                        toMonth={dayjs(project?.data.end_date).toDate()}
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl isloading={isLoad}>
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
              <Button className="w-full">{update.isPending ? <Spinner /> : 'Submit'}</Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </>
  );
};

const formDataInit: {
  open: boolean;
  id: number;
  title: string;
  date: {
    from: Date;
    to?: Date;
  };
} = {
  open: false,
  id: 0,
  title: '',
  date: {
    from: dayjs().toDate(),
    to: undefined,
  },
};

const ListSprint = ({ project_id }: { project_id: string }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const [formData, setFormData] = useState(formDataInit);
  const { data: project } = k.project.single.useQuery({ variables: { id: project_id } });
  const { data: sprints } = k.project.sprint.all.useQuery({ variables: { project_id } });

  const events = useMemo<EventSourceInput | undefined>(() => {
    if (!sprints) return undefined;

    return sprints.data.map((sprint) => {
      const allDay = dayjs(sprint.start_date).format('HH:mm:ss') === '00:00:01';

      if (dayjs(sprint.start_date).isSame(dayjs(sprint.end_date), 'second'))
        return {
          id: `${sprint.id}`,
          title: sprint.title,
          allDay,
          date: dayjs(sprint.start_date).format(`YYYY-MM-DD${allDay ? '' : 'THH:mm:ss'}`),
        };

      return {
        id: `${sprint.id}`,
        title: sprint.title,
        allDay,
        start: dayjs(sprint.start_date).format(`YYYY-MM-DD${allDay ? '' : 'THH:mm:ss'}`),
        end: dayjs(sprint.end_date).format(`YYYY-MM-DD${allDay ? '' : 'THH:mm:ss'}`),
      };
    });
  }, [sprints]);

  return (
    <>
      <ResponsiveDialogDrawer
        open={formData.open}
        onOpenChange={(open) =>
          setFormData((o) => {
            const d = isDesktop ? formDataInit : o;

            return {
              ...d,
              open,
            };
          })
        }
        title={formData.id === 0 ? 'Buat Jadwal Baru' : 'Update Jadwal'}
      >
        {formData.id === 0 && (
          <CreateSprint
            date={formData.date}
            onClose={() => setFormData(() => ({ ...formDataInit, open: false }))}
          />
        )}
        {formData.id !== 0 && (
          <UpdateSprint
            id={formData.id}
            onClose={() => setFormData(() => ({ ...formDataInit, open: false }))}
          />
        )}
      </ResponsiveDialogDrawer>
      <FullCalendar
        locale={idLocale}
        validRange={{
          start: project?.data.start_date,
          end: project?.data.end_date ?? undefined,
        }}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          right: 'prev,next',
          left: 'title',
          center: 'dayGridWeek,dayGridDay,dayGridMonth,listWeek', // user can switch between the two
        }}
        events={events}
        eventClick={(e) => {
          setFormData((o) => ({ ...o, open: true, id: Number(e.event.id) }));
        }}
        dateClick={(e) => {
          setFormData((o) => ({ ...o, open: true, date: { from: e.date } }));
        }}
      />
    </>
  );
};

export default ListSprint;
