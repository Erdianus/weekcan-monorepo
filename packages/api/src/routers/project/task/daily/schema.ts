import { z } from "zod";

const dailyTaskSchema = z.object({
  id: z.number(),
  desc_detail_task: z.string().min(1, "Tolong Isi Perihal"),
  task_project_id: z.union([
    z.string().min(1, "Tolong Pilih Tugas Proyek"),
    z.number().positive("Tolong Pilih Tugas Proyek"),
  ]),
  is_done: z.boolean(),
  date: z.string().min(1, "Tolong Pilih Tanggal"),
  created_at: z.string(),
});

// NOTE: FORM
const dailyTaskFormSchema = dailyTaskSchema
  .pick({
    desc_detail_task: true,
    task_project_id: true,
    date: true,
    is_done: true,
  })
  .extend({
    file: z.instanceof(File).nullish(),
    is_permanent: z.number(),
  });

export { dailyTaskFormSchema };

export default dailyTaskSchema;
