import z from "zod";

const detailBaseSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Tolong Isi Judul"),
  desc: z.string().min(1, "Tolong Isi Deskripsi"),
});

const detailFormSchema = detailBaseSchema.pick({
  title: true,
  desc: true,
}).extend({project_id: z.string().min(1, "Tolong Pilih Proyek") })

export {
  detailFormSchema
}

export default detailBaseSchema;
