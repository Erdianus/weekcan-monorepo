import { z } from "zod";

const jobBaseSchema = z.object({
  id: z.number(),
  name: z.string(),
  pic: z.string(),
  qty: z.string(),
  unit_of_qty: z.string(),
  frq: z.string(),
  frq_of_use: z.string(),
  status: z.string(),
  time: z.string(),
  desc: z.string(),
  rab_id: z.string(),
  project_id: z.string(),
  vendor_id: z.string(),
});

export default jobBaseSchema;
