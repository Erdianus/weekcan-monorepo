import { router } from "react-query-kit";
import { z } from "zod";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../../meta";
import attendanceBaseSchema from "../../attendance/schema";
import jobTypeBaseSchema from "../../job-type/schema";
import { roleBaseSchema } from "../../role/schema";

const dailyJobSchema = z.object({
  id: z.number(),
  name: z.number(),
  username: z.number(),
  email: z.number(),
  role_id: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  role: roleBaseSchema,
  job_type_id: z.string().nullish(),
  jobType: jobTypeBaseSchema.nullish(),
  picture_path: z.string(),
  status: z.string(),
  location_text: z.string(),
  attendance_id: z.string().nullish(),
  attendance: attendanceBaseSchema.nullish(),
  ket: z.string().nullish(),
  date: z.string().nullish(),
  time: z.string().nullish(),
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

// NOTE: Form
type Form = {
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
  single: {
    attendance: router.query({
      fetcher: async (variables: { user_id: string }) => {
        const res = await Axios.get(`/daily-jobs/user/${variables.user_id}`);

        return res.data as z.infer<typeof dailyJobSchema>;
      },
    }),
  },
  create: router.mutation({
    mutationFn: async (variables: { data: Form }) => {
      const res = await Axios.post(
        "/daily-jobs/attendance-daily-job",
        variables.data,
      );

      return res.data as { message: string };
    },
  }),
  update: {
    attendance: router.mutation({
      mutationFn: async (variable: { id: string; data: Form }) => {
        const res = await Axios.put(
          `/daily-jobs/attendance-daily-job/${variable.id}`,
          variable.data,
        );

        return res.data as { message: string };
      },
    }),
  },
};

export default daily_job;
