'use client';

import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info, Plus, Trash2, Zap } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import k, { useQueryClient } from '@repo/api/kit';
import { fileFormSchema } from '@repo/api/router/project/file/schema';
import Dropzone from '@repo/ui/components/dropzone';
import FileIcon from '@repo/ui/components/file-icon';
import Flashlist from '@repo/ui/components/flashlist';
import Loading from '@repo/ui/components/loading';
import Paginate from '@repo/ui/components/paginate';
import PaginationParams from '@repo/ui/components/pagination-params';
import PortalSearch from '@repo/ui/components/portal-search';
import { Button } from '@repo/ui/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/ui/popover';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import Spinner from '@repo/ui/components/ui/spinner';
import useAlertStore from '@repo/ui/lib/store/useAlertStore';

const label_format = (text: string) => {
  const t = text.match(/[A-Za-z].+/);
  return t?.[0] ?? '';
};

const ListFileProject = ({ id }: { id: string | number }) => {
  const searchparams = useSearchParams();
  const alert = useAlertStore();

  const form = useForm<z.infer<typeof fileFormSchema>>({
    resolver: zodResolver(fileFormSchema),
    values: {
      // @ts-ignore
      file: null,
      project_id: `${id}`,
    },
  });

  const client = useQueryClient();
  const { data: files } = k.project.file.all.useQuery({
    variables: {
      project_id: id,
      search: searchparams.get('search'),
      page: searchparams.get('page'),
      paginate: searchparams.get('paginate'),
    },
  });

  //--NOTE: Create Mutation
  const create = k.project.file.create.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      form.reset();
      await client.invalidateQueries({
        queryKey: k.project.file.all.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  //--NOTE: Delete Mutation
  const del = k.project.file.delete.useMutation({
    onSuccess: async ({ message }) => {
      toast.success(message);
      await client.invalidateQueries({
        queryKey: k.project.file.all.getKey(),
      });
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <PortalSearch placeholder="Cari Files..." />
      <div className="mb-4 flex items-center justify-between gap-4">
        <Popover>
          <PopoverTrigger asChild className="relative">
            <Button className="relative" size={'icon'}>
              <Plus />
              <Zap className="absolute bottom-1 right-1" size={12} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 max-w-80">
            <div className="flex max-w-80 flex-col">
              <div className="mb-3 flex items-center justify-between">
                <h4 className=" font-medium leading-none">Tambah File</h4>
                {!!form.getValues('file') && (
                  <p
                    className="cursor-pointer text-xs text-muted-foreground hover:underline"
                    onClick={() => {
                      // @ts-ignore
                      form.setValue('file', null);
                    }}
                  >
                    clear
                  </p>
                )}
              </div>
              <Form {...form}>
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit((data) => {
                    create.mutate({ data });
                  })}
                >
                  <FormField
                    control={form.control}
                    name="file"
                    render={() => (
                      <FormItem>
                        <FormLabel>File </FormLabel>
                        <div className="truncate text-xs text-muted-foreground">
                          {form.watch?.('file')?.name ?? ''}
                        </div>
                        <FormControl>
                          <Dropzone
                            accept={{
                              'application/msword': ['.doc'],
                              'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                                ['.docx'],
                              'application/vnd.ms-excel': ['.xls'],
                              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
                                '.xlsx',
                              ],
                              'text/csv': ['.csv'],
                              'image/png': ['.png'],
                              'application/pdf': ['.pdf'],
                              'image/jpeg': ['.jpg', '.jpeg'],
                            }}
                            onDrop={(files) => {
                              console.log(files);
                              form.setValue('file', files[0] as unknown as File);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={create.isPending}>
                    {create.isPending ? <Spinner /> : 'Submit'}
                  </Button>
                </form>
              </Form>
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
                  Halaman untuk menambahkan file-file penting dalam proyek
                </p>
                <p className="text-sm text-muted-foreground">Contoh</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Flashlist
        isloading={!files}
        loading={
          <Loading>
            <div className="flex items-center justify-between gap-4 border-b border-border p-4">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </Loading>
        }
        isfallback={files?.data.length === 0}
        fallback={<div>Tidak Ada Data Kustom</div>}
      >
        {files?.data.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between gap-4 border-b border-border p-4"
          >
            <div className="flex items-center gap-3">
              <FileIcon text={file.label} />
              <div className="text-muted-foreground">{label_format(file.label)}</div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant={'ghost'}
                size={'icon'}
                type="button"
                onClick={() => {
                  alert.setData({
                    open: true,
                    header: `Yakin ingin menghapus '${file.label}'?`,
                    desc: 'File yang sudah dihapus tidak dapat dikembalikan lagi.',
                    confirmText: 'Ya, Hapus',
                    onConfirm: () => {
                      del.mutate({ id: `${file.id}` });
                    },
                  });
                }}
              >
                {del.isPending && del.variables.id === `${file.id}` ? (
                  <Spinner />
                ) : (
                  <Trash2 size={20} />
                )}
              </Button>
            </div>
          </div>
        ))}
      </Flashlist>
      <div className="mt-4 flex w-full items-center justify-end">
        <Paginate />
        <PaginationParams meta={files?.meta} />
      </div>
    </>
  );
};

export default ListFileProject;
