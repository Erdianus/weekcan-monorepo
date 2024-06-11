import { router } from "react-query-kit";
import z from "zod";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../meta";
import userBaseSchema from "../user/schema";
import daily_job from "./daily-job";
import companyBaseSchema, { companyFormSchema as companyForm } from "./schema";
import task from "./task";

const companySchema = companyBaseSchema.extend({
  picture_link: z.string().nullish(),
  user: userBaseSchema.array(),
  owner: userBaseSchema,
  archive_category: z
    .object({
      id: z.number(),
      archive_name: z.string(),
    })
    .array(),
});

type Company = z.infer<typeof companySchema>;

// --NOTE: FORM
const companyCreateFormSchema = companyForm.omit({ owner: true });
const companyUpdateFormSchema = companyForm.omit({ owner: true }).extend({
  picture_path: z.union([z.string(), z.instanceof(File)]).optional(),
});

const company = router("company", {
  all: router.query({
    fetcher: async (variables?: {
      search?: string | null;
      page?: number | string | null;
      paginate?: string | null;
      project_id?: string | number;
      owner_id?: string | number | null;
      owner_name?: string | null;
    }) => {
      const res = await Axios("/company", { params: variables });

      return res.data as { data: Company[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variables: { id: string | number }) => {
      const res = await Axios(`/company/${variables.id}`);

      return res.data as { data: Company };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: {
      data: z.infer<typeof companyCreateFormSchema>;
    }) => {
      const res = await Axios.post(`/company`, variables.data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      id: string | number;
      data: z.infer<typeof companyUpdateFormSchema>;
    }) => {
      const res = await Axios.post(
        `/company/update-company/${variables.id}`,
        variables.data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string | number }) => {
      const res = await Axios.delete(`/company/${variables.id}`);

      return res.data as { message: string };
    },
  }),
  task,
  daily_job,
});

export { type Company };

export default company;
