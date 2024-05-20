import type { z } from "zod";
import { router } from "react-query-kit";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../meta";
import jobTypeBaseSchema from "./schema";

const jobTypeSchema = jobTypeBaseSchema;

const jobType = router("jobType", {
  all: router.query({
    fetcher: async (variables?: {
      search?: string;
      page?: string | number;
      paginate?: string | number;
      company_id?: string;
    }) => {
      const res = await Axios("/job-type", { params: variables });

      return res.data as { data: z.infer<typeof jobTypeSchema>[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variables: { id: string }) => {
      const res = await Axios(`/job-type/${variables.id}`);

      return res.data as { data: z.infer<typeof jobTypeSchema> };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: {
      data: { company_id: string; job_name: string };
    }) => {
      const res = await Axios.post("/job-type", variables.data);

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      id: string;
      data: { company_id: string; job_name: string };
    }) => {
      const res = await Axios.put(`/job-type/${variables.id}`, variables.data);

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string }) => {
      const res = await Axios.delete(`/job-type/${variables.id}`);

      return res.data as { message: string };
    },
  }),
});

export default jobType;
