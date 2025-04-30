import { z } from "zod";

const stockBaseSchema = z.object({
  id: z.number(),
  name: z.string(),
  picture_path: z.string(),
  code: z.string(),
  unit: z.string(),
  category: z.string(),
  warehouse_id: z.string(),
  item_id: z.string(),
  qty: z.union([z.string(), z.number()]),
  ket: z.string(),
  expired_date: z.string(),
});

export default stockBaseSchema;
