import { router } from "react-query-kit";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../../meta";
import type { Category } from "./schema";

const category = {
  all: router.query({
    fetcher: async (variables: { search?: string; page?: number }) => {
      const res = await Axios("/archive/category", {
        params: {
          ...variables,
        },
      });

      return res.data as { data: Category[]; meta: Meta };
    },
  }),
  infinite: router.infiniteQuery({
    fetcher: async (variables: { searchCategory?: string }, { pageParam }) => {
      const res = await Axios("/archive/category", {
        params: {
          ...variables,
          search: variables.searchCategory,
          page: pageParam,
        },
      });

      return res.data as { data: Category[]; meta: Meta };
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
      const res = await Axios.post(`/archive/category`, variables.data);

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      id: string | number;
      data: { name: string };
    }) => {
      const res = await Axios.put(
        `/archive/category/${variables.id}`,
        variables.data,
      );

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string | number }) => {
      const res = await Axios.delete(`/archive/category/${variables.id}`);

      return res.data as { message: string };
    },
  }),
};

export { category };
