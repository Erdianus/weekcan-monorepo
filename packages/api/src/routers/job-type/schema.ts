import { z } from "zod";

type JobType = {
  id: number;
  job_name: string;
};

const jobTypeBaseSchema = z.object({
  id: z.number(),
  job_name: z.string(),
});

export default jobTypeBaseSchema;

export type { JobType };
