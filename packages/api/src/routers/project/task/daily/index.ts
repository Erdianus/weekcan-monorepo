import { router } from "react-query-kit";
import { z } from "zod";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../../../meta";
import dailyTaskSchema, { dailyTaskFormSchema } from "./schema";

const dailySchema = dailyTaskSchema.extend({
  link_file: z.string().nullish(),
  file: z.string().nullish(),
});

// NOTE: FORM
const dailyTaskCreateForm = dailyTaskFormSchema.extend({
  is_done: z.number(),
  is_permanent: z.number(),
});
const dailyTaskUpdateForm = dailyTaskFormSchema.omit({
  file: true,
  is_permanent: true,
});

const dailyTaskUpdateFileForm = dailyTaskFormSchema.pick({
  file: true,
  is_permanent: true,
});

const daily = {
  all: router.query({
    fetcher: async (variables: { task_project_id: string }) => {
      const res = await Axios("/detail-task", { params: variables });

      return res.data as { data: z.infer<typeof dailySchema>[]; meta: Meta };
    },
  }),
  dateGroup: router.query({
    fetcher: async (variables: {
      task_project_id: string;
      from?: string;
      to?: string;
    }) => {
      const res = await Axios("/detail-task/by-date", { params: variables });

      return res.data as {
        data: Record<string, z.infer<typeof dailySchema>[]>;
        meta: { hasMore: boolean };
      };
    },
  }),
  single: router.query({
    fetcher: async (variables: { id: string }) => {
      const res = await Axios(`/detail-task/${variables.id}`);

      return res.data as {
        data: z.infer<typeof dailySchema>;
        meta: Meta;
      };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: {
      data: z.infer<typeof dailyTaskCreateForm>;
    }) => {
      const res = await Axios.post("/detail-task", variables.data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      id: string;
      data: z.infer<typeof dailyTaskUpdateForm>;
    }) => {
      const res = await Axios.put(
        `/detail-task/${variables.id}`,
        variables.data,
      );

      return res.data as { message: string };
    },
  }),
  updateFile: router.mutation({
    mutationFn: async (variables: {
      id: string;
      data: z.infer<typeof dailyTaskUpdateFileForm>;
    }) => {
      const res = await Axios.post(
        `/detail-task/${variables.id}`,
        variables.data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        },
      );

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string }) => {
      const res = await Axios.delete(`/detail-task/${variables.id}`);

      return res.data as { message: string };
    },
  }),
};

export default daily;
