import { router } from 'react-query-kit';

import { Meta } from '~/api/meta';
import { Axios } from '~/lib/axios';
import { Skill } from './schema';

const skill = {
  all: router.query({
    fetcher: async (variables?: { searchSkill?: string }) => {
      const res = await Axios('/archive/skill', {
        params: {
          ...variables,
          search: variables?.searchSkill,
        },
      });

      return res.data as { data: Skill[]; meta: Meta };
    },
  }),
  infinite: router.infiniteQuery({
    fetcher: async (variables: { searchSkill?: string }, { pageParam }) => {
      const res = await Axios('/archive/skill', {
        params: {
          ...variables,
          search: variables?.searchSkill,
          page: pageParam,
        },
      });

      return res.data as { data: Skill[]; meta: Meta };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.current_page === lastPage.meta.current_page)
        return null;

      return lastPage.meta.current_page + 1;
    },
    initialPageParam: 1,
  }),

  create: router.mutation({
    mutationFn: async (variables: { data: { name: string } }) => {
      const res = await Axios.post(`/archive/skill`, variables.data);

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      id: string | number;
      data: { name: string };
    }) => {
      const res = await Axios.put(
        `/archive/skill/${variables.id}`,
        variables.data,
      );

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string | number }) => {
      const res = await Axios.delete(`/archive/skill/${variables.id}`);

      return res.data as { message: string };
    },
  }),
};

export { skill };
