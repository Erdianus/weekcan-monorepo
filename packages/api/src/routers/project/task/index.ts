import { router } from "react-query-kit";
import { z } from "zod";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../../meta";
import type { taskProjectFormSchema } from "./schema";
import userBaseSchema from "../../user/schema";
import projectBaseSchema from "../schema";
import sprintBaseSchema from "../sprint/schema";
import taskProjectBaseSchema from "./schema";

const taskProjectSchema = taskProjectBaseSchema.extend({
  task_for: userBaseSchema,
  have_daily_task: z.boolean(),
  set_by: userBaseSchema,
  sprint: sprintBaseSchema.nullish(),
  project: projectBaseSchema,
});

type TaskProject = z.infer<typeof taskProjectSchema>;

const task = {
  all: router.query({
    fetcher: async (variables: {
      project_id: string;
      search?: string;
      page?: number;
      paginate?: number;
    }) => {
      const res = await Axios("/task-project", { params: variables });

      return res.data as { data: TaskProject[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variables: { id: string }) => {
      const res = await Axios(`/task-project/${variables.id}`);

      return res.data as { data: TaskProject };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: {
      data: z.infer<typeof taskProjectFormSchema>;
    }) => {
      const res = await Axios.post(`/task-project`, variables.data);

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      id: string;
      data: z.infer<typeof taskProjectFormSchema>;
    }) => {
      const res = await Axios.put(
        `/task-project/${variables.id}`,
        variables.data,
      );

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string[] }) => {
      const res = await Axios.post(`/task-project/delete`, variables);

      return res.data as { message: string };
    },
  }),
};

export default task;
