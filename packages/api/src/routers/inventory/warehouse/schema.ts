import { z } from "zod";

const warehouseBaseSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string().nullish(),
  company_id: z.string().min(1, "Tolong Pilih Perusahaan"),
});

export default warehouseBaseSchema;
