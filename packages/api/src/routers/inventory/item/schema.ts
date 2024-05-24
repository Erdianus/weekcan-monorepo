import { z } from "zod";

const itemBaseSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Tolong Isi Nama Barang"),
  picture_path: z.string(),
  unit: z.string(),
});

export default itemBaseSchema;
