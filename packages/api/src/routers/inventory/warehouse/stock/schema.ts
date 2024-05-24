import { z } from "zod";

const stockBaseSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Tolong Isi Nama Satuan"),
});
