import { router } from "react-query-kit";
import { z } from "zod";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../../meta";
import jobTypeBaseSchema from "../../job-type/schema";
import { roleBaseSchema } from "../../role/schema";

const dailyJobSchema = z.object({
  id: z.number(),
  name: z.number(),
  username: z.number(),
  email: z.number(),
  role_id: z.string(),
  role: roleBaseSchema,
  job_type_id: z.string().nullish(),
  jobType: jobTypeBaseSchema.nullish(),
  picture_path: z.string(),
  status: z.string(),
  location_text: z.string(),
  ket: z.string(),
  time: z.string(),
  dailyJob: z
    .object({
      id: z.number(),
      user_id: z.string(),
      text: z.string(),
      date: z.string(),
      status: z.string(),
    })
    .array()
    .nullish(),
});

const daily_job = {
  users: router.query({
    fetcher: async (variables: {
      company_id: string;
      search?: string;
      date?: string;
      page?: number | string;
      paginate?: number | string;
    }) => {
      const res = await Axios("/daily-jobs/users", { params: variables });

      return res.data as { data: z.infer<typeof dailyJobSchema>[]; meta: Meta };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: {
      data: {
        user_id: string;
        latitude: number;
        longitude: number;
        ket: string;
        status: string;
        time: string;
        date: string;
        location_text: string;
        daily_jobs: {
          user_id: number;
          text: string;
          date: string;
          status: string;
        }[];
      };
    }) => {
      const res = await Axios.post(
        "/daily-jobs/attendance-daily-job",
        variables.data,
      );

      return res.data as { message: string };
    },
  }),
};

export default daily_job;
