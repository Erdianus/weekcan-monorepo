import { z } from "zod";

const archiveBaseSchema = z.object({
  id: z.number(),
  archive_details: z.any(),
  archive_category_id: z.string(),
  province: z.string(),
  city: z.string(),
  pictures: z
    .object({
      id: z.number(),
      filename: z.string(),
      picture_path: z.string(),
    })
    .array(),
});

export default archiveBaseSchema;
