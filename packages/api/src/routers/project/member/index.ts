import { router } from "react-query-kit";
import z from "zod";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../../meta";
import memberBaseSchema from "./schema";

const memberSchema = memberBaseSchema.extend({
  role_name: z.string(),
  role_member: z.object({
    project_id: z.string(),
    user_id: z.string(),
    role: z.string(),
  }),
});

type MemberProject = z.infer<typeof memberSchema>;

// NOTE: FORM
const memberFormSchema = z.object({
  project_id: z.string(),
  users_id: z.number().array().min(1),
  role: z.string().array(),
});

const member = {
  all: router.query({
    fetcher: async (variables: {
      project_id: string;
      params?: {
        page?: string | number | null;
        paginate?: string | number | null;
        search?: string | null;
      };
    }) => {
      const res = await Axios(`/project-member/${variables.project_id}`, {
        params: variables.params,
      });

      return res.data as { data: MemberProject[]; meta: Meta };
    },
  }),
  notInProject: router.query({
    fetcher: async (variables: {
      project_id: string;
      params?: {
        page?: string | number | null;
        paginate?: string | number | null;
        search?: string | null;
      };
    }) => {
      const res = await Axios(
        `/member-outside-project/${variables.project_id}`,
        { params: variables.params },
      );

      return res.data as { data: MemberProject[]; meta: Meta };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: {
      data: z.infer<typeof memberFormSchema>;
    }) => {
      const res = await Axios.post("/project-member", variables.data);

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      data: { project_id: string; user_id: number; role: string };
    }) => {
      const res = await Axios.put(`/project-member`, variables.data);

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: {
      user_id: string | number;
      project_id: string | number;
    }) => {
      const res = await Axios.delete(`/project-member`, { params: variables });

      return res.data as { message: string };
    },
  }),
};

export { type MemberProject };

export default member;
