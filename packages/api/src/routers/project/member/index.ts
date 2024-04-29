import { Meta } from '@api/routers/meta';
import { router } from 'react-query-kit';
import z from 'zod';

import Axios from '@repo/utils/axios';

import memberBaseSchema from './schema';

const memberSchema = memberBaseSchema.extend({
  role_name: z.string(),
});

type MemberProject = z.infer<typeof memberSchema>;

const member = {
  all: router.query({
    fetcher: async (variables: {
      project_id: string | null;
      page?: string | number | null;
      paginate?: string | number | null;
      search?: string | null;
    }) => {
      const res = await Axios('/user', { params: variables });

      return res.data as { data: MemberProject[]; meta: Meta };
    },
  }),
  all_add: router.query({
    fetcher: async (variables: { skip_project_id: string | null; company_id?: string[] }) => {
      const res = await Axios('/user', { params: variables });

      return res.data as { data: MemberProject[]; meta: Meta };
    },
  }),
};

export { type MemberProject };

export default member;
