import { z } from "zod";

const jobTypeBaseSchema = z.object({
  id: z.number(),
  job_name: z.string(),
});

export default jobTypeBaseSchema;
