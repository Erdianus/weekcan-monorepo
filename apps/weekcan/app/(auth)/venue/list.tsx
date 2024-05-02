'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Plus, Trash2, X, Zap } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import k, { useQueryClient } from '@repo/api/kit';
import { venueFormSchema } from '@repo/api/router/venue/schema';
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

const EditVenue = (props: { data: { name: string; id: number }; onClose: () => void }) => {
  const [name, setName] = useState(props.data.name);

  const client = useQueryClient();
  const update = k.venue.update.useMutation({
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

const ListVenue = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const variables = Object.fromEntries(searchParams.entries());
  const alert = useAlertStore();
  const [editID, setEditID] = useState(0);

  const form = useForm<z.infer<typeof venueFormSchema>>({
    resolver: zodResolver(venueFormSchema),
    values: {
      name: '',
    },
  });

  const { data: venues } = k.venue.all.useQuery({
    variables,
  });

  //--NOTE: Create Mutation
  const create = k.venue.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      form.reset();
      router.refresh();
      // await client.refetchQueries({ queryKey: k.venue.all.getKey(variables) });
    },
    onError: ({ message }) => toast.error(message),
  });

  //--NOTE: Delete Mutation
  const del = k.venue.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      router.refresh();
      // await client.refetchQueries({ queryKey: k.venue.all.getKey(variables) });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <PortalSearch placeholder="Cari Tempat..." />
      <div className="flex items-center justify-between">
        <H3 className="mb-4">Tempat Acara</H3>
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
        isloading={!venues}
        loading={
          <Loading>
            <div className="flex items-center justify-between gap-4 border-b border-border p-4">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </Loading>
        }
        isfallback={venues?.data.length === 0}
        fallback={<div>Tidak Ada Data Tempat</div>}
      >
        {venues?.data.map((venue) => (
          <div
            key={`venue-${venue.id}`}
            className="flex items-center justify-between gap-4 border-b border-border p-4"
          >
            {editID === venue.id && (
              <EditVenue
                data={venue}
                onClose={() => {
                  setEditID(0);
                }}
              />
            )}
            {editID !== venue.id && (
              <>
                <div>{venue.name}</div>
                <div className="flex items-center gap-4">
                  {/* <Button
                    variant={"ghost"}
                    size={"icon"}
                    type="button"
                    onClick={() => setEditID(venue.id)}
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
                        header: `Yakin ingin menghapus '${venue.name}'?`,
                        desc: 'Tempat acara yang sudah dihapus tidak dapat dikembalikan lagi.',
                        confirmText: 'Ya, Hapus',
                        onConfirm: () => {
                          del.mutate({ id: `${venue.id}` });
                        },
                      });
                    }}
                  >
                    {del.isPending && del.variables.id === `${venue.id}` ? (
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
        <PaginationParams meta={venues?.meta} />
      </div>
    </>
  );
};

export default ListVenue;
