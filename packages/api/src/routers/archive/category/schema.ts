import { z } from "zod";

import companyBaseSchema from "../../company/schema";

const archiveCategoryBaseSchema = z.object({
  id: z.number(),
  archive_name: z.string(),
  company_id: z.string(),
  archive_input: z
    .object({
      type: z.string(),
      field: z.string(),
      print: z.boolean().optional(),
    })
    .array(),
  havePicture: z.boolean().default(false),
  company: companyBaseSchema,
  icon: z.string().optional(),
});

export { archiveCategoryBaseSchema };
