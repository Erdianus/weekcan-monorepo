import { router } from "react-query-kit";
import { z } from "zod";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../../meta";
import taskBaseSchema from "../../task/schema";

const taskCompanySchema = taskBaseSchema.extend({
  project_id: z.union([z.number(), z.string()]).nullish(),
  project_name: z.string().nullish(),
  task_for_name: z.string(),
});

const task = {
  all: router.query({
    fetcher: async (variables: {
      company_id: string;
      page?: string | number;
      paginate?: string | number;
      search?: string;
    }) => {
      const res = await Axios("/task-project", { params: variables });

      return res.data as {
        data: z.infer<typeof taskCompanySchema>[];
        meta: Meta;
      };
    },
  }),
  allInfinity: router.infiniteQuery({
    fetcher: async (variables: {
      company_id: string;
      page?: string | number;
      paginate?: string | number;
      search?: string;
    }) => {
      const res = await Axios("/task-project", { params: variables });

      return res.data as {
        data: z.infer<typeof taskCompanySchema>[];
        meta: Meta;
      };
    },
    getNextPageParam: (last) => {
      const { current_page, last_page } = last.meta;

      if (current_page === last_page) return null;
      return current_page + 1;
    },
    initialPageParam: 1,
  }),
};

export default task;
