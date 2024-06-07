import type { z } from "zod";
import { router } from "react-query-kit";

import Axios from "@hktekno/utils/axios";

import userBaseSchema from "../user/schema";
import dailyJobsBaseSchema from "./schema";

const dailySchema = dailyJobsBaseSchema.extend({
  user: userBaseSchema,
});

const dailyJobs = router("daily_jobs", {
  byDate: router.query({
    fetcher: async (variables: {
      user_id: string;
      search?: string;
      paginate?: number | string;
      page?: number | string;
      from?: string;
      to?: string;
    }) => {
      const res = await Axios("/daily-jobs/by-date", { params: variables });

      return res.data as {
        data: Record<string, z.infer<typeof dailySchema>[]>;
      };
    },
  }),
});

export default dailyJobs;
