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
  create: router.mutation({
    mutationFn: async (variables: { data: z.infer<typeof sprintFormSchema> }) => {
      const res = await Axios.post('/sprint', variables.data);

      return res.data as { message: string };
    },
  }),
};

export default sprint;
