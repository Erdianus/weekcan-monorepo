'use client';

import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Info, Pencil, Plus, Trash2, X, Zap } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import k, { useQueryClient } from '@repo/api/kit';
import { detailFormSchema } from '@repo/api/router/project/detail/schema';
import Flashlist from '@repo/ui/components/flashlist';
import Loading from '@repo/ui/components/loading';
import PortalSearch from '@repo/ui/components/portal-search';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/ui/popover';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import Spinner from '@repo/ui/components/ui/spinner';
import useAlertStore from '@repo/ui/lib/store/useAlertStore';

const EditCustom = (props: {
  data: { title: string; desc: string; id: number };
  onClose: () => void;
}) => {
  const params = useParams<{ project_id: string }>();

  const form = useForm<z.infer<typeof detailFormSchema>>({
    resolver: zodResolver(detailFormSchema),
    values: {
      title: props.data.title,
      desc: props.data.desc,
      project_id: params.project_id,
    },
  });

  const client = useQueryClient();
  const update = k.project.detail.update.useMutation({
    onSuccess: async ({ message }) => {
      await client.invalidateQueries({
        queryKey: k.project.detail.all.getKey(),
      });
      toast.success(message);
      props.onClose();
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <form
      className="flex w-full items-center justify-between"
      onSubmit={form.handleSubmit((data) => {
        update.mutate({
          id: props.data.id,
          data,
        });
      })}
    >
      <div className="space-y-1">
        <div>
          <Label className="mb-1.5">Judul</Label>
          <Input {...form.register('title')} />
        </div>
        <div>
          <Label className="mb-1.5">Deskripsi</Label>
          <Input {...form.register('desc')} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant={'ghost'} size={'icon'} type="button" onClick={props.onClose}>
          <X size={20} />
        </Button>
        <Button variant={'ghost'} size={'icon'} type="submit">
          {update.isPending ? <Spinner /> : <Check />}
        </Button>
      </div>
    </form>
  );
};

const ListCustomProject = ({ id }: { id: string | number }) => {
  const searchParams = useSearchParams();
  const alert = useAlertStore();
  const [editID, setEditID] = useState(0);

  const form = useForm<z.infer<typeof detailFormSchema>>({
    resolver: zodResolver(detailFormSchema),
    values: {
      title: '',
      desc: '',
      project_id: `${id}`,
    },
  });

  const client = useQueryClient();
  const { data: customs } = k.project.detail.all.useQuery({
    variables: {
      project_id: id,
      search: searchParams.get('search'),
      page: searchParams.get('page'),
      paginate: searchParams.get('paginate'),
    },
  });

  //--NOTE: Create Mutation
  const create = k.project.detail.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      form.reset();
      await client.invalidateQueries({
        queryKey: k.project.detail.all.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  //--NOTE: Delete Mutation
  const del = k.project.detail.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.project.detail.all.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <PortalSearch className="Cari Data Kustom Proyek..." disabled={!customs} />
      <div className="mb-4 flex items-center justify-between gap-4">
        <Popover>
          <PopoverTrigger asChild className="relative">
            <Button className="relative" size={'icon'}>
              <Plus />
              <Zap className="absolute bottom-1 right-1" size={12} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Tambah Tempat Acara</h4>
              </div>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit((data) => {
                  create.mutate({ data: [data] });
                })}
              >
                <div>
                  <Label className="mb-1">Nama</Label>
                  <Input {...form.register('title')} placeholder="Contoh: Convention Hall" />
                </div>
                <div>
                  <Label className="mb-1">Deskripsi</Label>
                  <Input {...form.register('desc')} placeholder="Contoh: Convention Hall" />
                </div>
                <Button type="submit" disabled={create.isPending}>
                  {create.isPending ? <Spinner /> : 'Submit'}
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Info size={16} />
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Ini adalah halaman untuk menambahkan data tambahan pada proyek yang tidak ada
                  dalam saat kalian membuat sebuah proyek
                </p>
                <p className="text-sm text-muted-foreground">Contoh</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Flashlist
        isloading={!customs}
        loading={
          <Loading>
            <div className="flex items-center justify-between gap-4 border-b border-border p-4">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </Loading>
        }
        isfallback={customs?.data.length === 0}
        fallback={<div>Tidak Ada Data Kustom</div>}
      >
        {customs?.data.map((custom) => (
          <div className="flex items-center justify-between gap-4 border-b border-border p-4">
            {editID === custom.id && (
              <EditCustom
                data={custom}
                onClose={() => {
                  setEditID(0);
                }}
              />
            )}
            {editID !== custom.id && (
              <>
                <div>
                  <div className="text-muted-foreground">{custom.title}</div>
                  <div className="text-lg">{custom.desc}</div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant={'ghost'}
                    size={'icon'}
                    type="button"
                    onClick={() => setEditID(custom.id)}
                  >
                    <Pencil size={20} />
                  </Button>
                  <Button
                    variant={'ghost'}
                    size={'icon'}
                    type="button"
                    onClick={() => {
                      alert.setData({
                        open: true,
                        header: `Yakin ingin menghapus '${custom.title}'?`,
                        desc: 'Data Kustom yang sudah dihapus tidak dapat dikembalikan lagi.',
                        confirmText: 'Ya, Hapus',
                        onConfirm: () => {
                          del.mutate({ id: `${custom.id}` });
                        },
                      });
                    }}
                  >
                    {del.isPending && del.variables.id === `${custom.id}` ? (
                      <Spinner />
                    ) : (
                      <Trash2 size={20} />
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </Flashlist>
    </>
  );
};

export default ListCustomProject;
