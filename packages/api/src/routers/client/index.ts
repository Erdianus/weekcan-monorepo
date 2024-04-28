import { router } from 'react-query-kit';
import z from 'zod';

import Axios from '@repo/utils/axios';

import { Meta } from '../meta';
import { clientBaseSchema, clientFormSchema } from './schema';

type Client = z.infer<typeof clientBaseSchema>;

const client = router('client', {
  all: router.query({
    fetcher: async (variables: { search?: number | string | null; paginate?: string | null; page?: string | null | number }) => {
      const res = await Axios('/client', { params: variables });

      return res.data as { data: Client[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variable: { id: string }) => {
      const res = await Axios(`/client/${variable.id}`);

      return res.data as { data: Client };
    },
  }),
  create: router.mutation({
    mutationFn: async (variable: { data: z.infer<typeof clientFormSchema> }) => {
      const res = await Axios.post(`/client`, variable.data);

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variable: { id: string; data: z.infer<typeof clientFormSchema> }) => {
      const res = await Axios.put(`/client/${variable.id}`, variable.data);

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variable: { id: string }) => {
      const res = await Axios.delete(`/client/${variable.id}`);

      return res.data as { message: string };
    },
  }),
});

export default client;
