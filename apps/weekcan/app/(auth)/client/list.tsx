'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Plus, Trash2, X, Zap } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import k, { useQueryClient } from '@repo/api/kit';
import { clientFormSchema } from '@repo/api/router/client/schema';
import Flashlist from '@repo/ui/components/flashlist';
import Loading from '@repo/ui/components/loading';
import Paginate from '@repo/ui/components/paginate';
import PaginationParams from '@repo/ui/components/pagination-params';
import PortalSearch from '@repo/ui/components/portal-search';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/ui/popover';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import Spinner from '@repo/ui/components/ui/spinner';
import { H3 } from '@repo/ui/components/ui/typograhpy';
import useAlertStore from '@repo/ui/lib/store/useAlertStore';

const EditClient = (props: { data: { name: string; id: number }; onClose: () => void }) => {
  const [name, setName] = useState(props.data.name);

  const client = useQueryClient();
  const update = k.client.update.useMutation({
    onSuccess: async ({ message }) => {
      await client.invalidateQueries({ queryKey: k.venue.all.getKey() });
      toast.success(message);
      props.onClose();
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <div className="flex items-center gap-4">
        <Button variant={'ghost'} size={'icon'} type="button" onClick={props.onClose}>
          <X size={20} />
        </Button>
        <Button
          variant={'ghost'}
          size={'icon'}
          type="button"
          onClick={() => {
            update.mutate({
              id: `${props.data.id}`,
              data: { name },
            });
          }}
        >
          {update.isPending && update.variables.id === `${props.data.id}` ? <Spinner /> : <Check />}
        </Button>
      </div>
    </>
  );
};

const ListClient = () => {
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const alert = useAlertStore();
  const [editID, setEditID] = useState(0);

  const form = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
    values: {
      name: '',
    },
  });

  const client = useQueryClient();
  const { data: clients } = k.client.all.useQuery({
    variables,
  });

  //--NOTE: Create Mutation
  const create = k.client.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      form.reset();
      await client.invalidateQueries({ queryKey: k.client.all.getKey(variables) });
    },
    onError: ({ message }) => toast.error(message),
  });

  //--NOTE: Delete Mutation
  const del = k.client.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({ queryKey: k.client.all.getKey(variables) });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <PortalSearch placeholder="Cari Tempat..." />
      <div className="flex items-center justify-between">
        <H3 className="mb-4">Klient</H3>
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
                  create.mutate({ data });
                })}
              >
                <Label>Nama</Label>
                <Input {...form.register('name')} placeholder="Contoh: Convention Hall" />
                <Button type="submit" disabled={create.isPending}>
                  {create.isPending ? <Spinner /> : 'Submit'}
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Flashlist
        isloading={!clients}
        loading={
          <Loading>
            <div className="flex items-center justify-between gap-4 border-b border-border p-4">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </Loading>
        }
        isfallback={clients?.data.length === 0}
        fallback={<div>Tidak Ada Data Tempat</div>}
      >
        {clients?.data.map((client) => (
          <div
            key={`client-${client.id}`}
            className="flex items-center justify-between gap-4 border-b border-border p-4"
          >
            {editID === client.id && (
              <EditClient
                data={client}
                onClose={() => {
                  setEditID(0);
                }}
              />
            )}
            {editID !== client.id && (
              <>
                <div>{client.name}</div>
                <div className="flex items-center gap-4">
                  {/* <Button
                    variant={"ghost"}
                    size={"icon"}
                    type="button"
                    onClick={() => setEditID(client.id)}
                  >
                    <Pencil size={20} />
                  </Button> */}
                  <Button
                    variant={'ghost'}
                    size={'icon'}
                    type="button"
                    onClick={() => {
                      alert.setData({
                        open: true,
                        header: `Yakin ingin menghapus '${client.name}'?`,
                        desc: 'Data klien yang sudah dihapus tidak dapat dikembalikan lagi.',
                        confirmText: 'Ya, Hapus',
                        onConfirm: () => {
                          del.mutate({ id: `${client.id}` });
                        },
                      });
                    }}
                  >
                    {del.isPending && del.variables.id === `${client.id}` ? (
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
      <div className="mt-4 flex w-full items-center justify-end gap-4">
        <Paginate />
        <PaginationParams meta={clients?.meta} />
      </div>
    </>
  );
};

export default ListClient;
