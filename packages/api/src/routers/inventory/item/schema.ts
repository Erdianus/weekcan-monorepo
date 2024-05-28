import { z } from "zod";

const itemBaseSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Tolong Isi Nama Barang"),
  picture_path: z.string(),
  unit: z.string(),
  category: z.string(),
  picture_link: z.string(),
  qty: z.number(),
  expired_date: z.string(),
});

export default itemBaseSchema;
