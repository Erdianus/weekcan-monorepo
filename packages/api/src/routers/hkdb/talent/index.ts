import { router } from "react-query-kit";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../../meta";
import type { Talent } from "./schema";

type TalentForm = {
  name: string;
  birth_date?: string;
  about: string;
  category_id: string | number;
  skill?: string[];
  experience?: {
    title: string;
    from: string;
    to: string;
    detail: string;
  }[];
  education?: {
    title: string;
    from: string;
    to: string;
    detail: string;
  }[];
  contact?: {
    type: string;
    contact: string;
  }[];
};

const talent = {
  all: router.query({
    fetcher: async (variables: {
      page?: number;
      skill_id?: string;
      category_id?: string;
      search?: string;
    }) => {
      const res = await Axios("/archive/talent", {
        params: variables,
      });

      return res.data as { data: Talent[]; meta: Meta };
    },
  }),
  infinite: router.infiniteQuery({
    fetcher: async (
      variables: { skill_id?: string; category_id?: string; search?: string },
      { pageParam },
    ) => {
      const res = await Axios("/archive/talent", {
        params: {
          ...variables,
          page: pageParam,
        },
      });

      return res.data as { data: Talent[]; meta: Meta };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.current_page === lastPage.meta.current_page)
        return null;

      return lastPage.meta.current_page + 1;
    },
    initialPageParam: 1,
  }),

  create: router.mutation({
    mutationFn: async (variables: { data: TalentForm }) => {
      const res = await Axios.post(`/archive/talent`, variables.data);

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

export { talent };
