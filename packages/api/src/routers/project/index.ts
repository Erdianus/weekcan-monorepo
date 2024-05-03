import Axios from "@repo/utils/axios";
import { router } from "react-query-kit";
import z from "zod";

import type { Meta } from "../meta";
import companyBaseSchema from "../company/schema";
import detail from "./detail";
import file from "./file";
import member from "./member";
import projectBaseSchema, { projectFormSchema } from "./schema";
import sprint from "./sprint";

const projectParamsSchema = z
  .object({
    company_id: z.string().nullish(),
    company_name: z.string().nullish(), // Aslinya gak ada,
    search: z.string().nullish(),
    progress: z.string().nullish(),
    page: z.string().nullish(),
    paginate: z.string().nullish(),
    user_id: z.string().nullish(),
    user_name: z.string().nullish(), // Aslinya gak ada
    from: z.string().nullish(),
    to: z.string().nullish(),
    city: z.string().nullish(),
    province: z.string().nullish(),
  })
  .optional();

const projectSchema = projectBaseSchema.extend({
  pic_name: z.string(),
  client_name: z.string(),
  venue_name: z.string(),
  location: z.string(),
  company: companyBaseSchema.array(),
});

type Project = z.infer<typeof projectSchema>;

// NOTE: FORM
const projectForm = projectFormSchema.omit({
  company: true,
  picSelect: true,
  venue_select: true,
  client_select: true,
});

const project = router("project", {
  all: router.query({
    fetcher: async (variables?: z.infer<typeof projectParamsSchema>) => {
      const res = await Axios.get("/project", {
        params: variables,
      });

      return res.data as { data: Project[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variables: { id: string | number }) => {
      const res = await Axios.get(`/project/${variables.id}`);

      return res.data as { data: Project };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: { data: z.infer<typeof projectForm> }) => {
      const res = await Axios.post(`/project`, variables.data);

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      id: string | number;
      data: z.infer<typeof projectForm>;
    }) => {
      const res = await Axios.put(`/project/${variables.id}`, variables.data);

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string | number }) => {
      const res = await Axios.delete(`/project/${variables.id}`);

      return res.data as { message: string };
    },
  }),
  detail,
  file,
  member,
  sprint,
});

export { type Project };

export default project;
