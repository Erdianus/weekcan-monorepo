import { z } from "zod";

const absentBaseSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  date: z.string(),
  type_of_absent: z.string(),
  desc: z.string(),
  file_path: z.string(),
});

export { absentBaseSchema };
