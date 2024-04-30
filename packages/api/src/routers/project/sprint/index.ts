import { Meta } from '@api/routers/meta';
import { router } from 'react-query-kit';
import z from 'zod';

import Axios from '@repo/utils/axios';

import sprintBaseSchema, { sprintFormSchema } from './schema';

const sprint = {
  all: router.query({
    fetcher: async (variables: {
      page?: string | number | null;
      paginate?: string | number | null;
      search?: string | null;
      project_id: string | null;
    }) => {
      const res = await Axios('/sprint', { params: variables });

      return res.data as { data: z.infer<typeof sprintBaseSchema>[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variables: { id: string | number }) => {
      const res = await Axios(`/sprint/${variables.id}`);

      return res.data as { data: z.infer<typeof sprintBaseSchema> };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: { data: z.infer<typeof sprintFormSchema> }) => {
      const res = await Axios.post('/sprint', variables.data);

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      id: string | number;
      data: z.infer<typeof sprintFormSchema>;
    }) => {
      const res = await Axios.put(`/sprint/${variables.id}`, variables.data);

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string | number }) => {
      const res = await Axios.delete(`/sprint/${variables.id}`);

      return res.data as { message: string };
    },
  }),
};

export default sprint;
