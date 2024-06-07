import { z } from "zod";

const dailyJobsBaseSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  text: z.string(),
  status: z.string(),
  date: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export default dailyJobsBaseSchema;
