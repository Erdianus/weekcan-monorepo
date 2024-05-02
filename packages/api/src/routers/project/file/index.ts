import { router } from 'react-query-kit';
import z from 'zod';

import Axios from '@repo/utils/axios';

import { Meta } from '../../meta';
import fileBaseSchema, { fileFormSchema } from './schema';

type FileProject = z.infer<typeof fileBaseSchema>;

const file = {
  all: router.query({
    fetcher: async (variables: {
      project_id: string | number;
      page?: string | number | null;
      paginate?: string | number | null;
      search?: string | null;
    }) => {
      const res = await Axios('/file-project', { params: { ...variables, have_detail_id: 0 } });

      return res.data as { data: FileProject[]; meta: Meta };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: { data: z.infer<typeof fileFormSchema> }) => {
      const res = await Axios.post(
        '/file-project',
        { ...variables.data, is_permanent: 1 },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        },
      );

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string | number }) => {
      const res = await Axios.delete(`/file-project/${variables.id}`);

      return res.data as { message: string };
    },
  }),
};

export default file;
