import { z } from "zod";

const taskBaseSchema = z.object({
  id: z.number(),
  task_name: z.string().min(1, "Tolong Isi Nama Kerjaan"),
  desc: z.string().min(1, "Tolong Isi Deskripsi"),
  start_date: z.string().min(1, "Tolong Isi Tanggal"),
  end_date: z.string().min(1, "Tolong Isi Tanggal"),
  task_for: z.string().min(1, "Tolong Pilih Tugas Siapa"),
  project_id: z.string().nullish(),
  sprint_id: z.string().nullish(),
  task_status: z.string().min(1, "Tolong Pilih Status").default("On Going"),
  have_daily_task: z.union([z.number(), z.boolean()]),
  set_by: z.string().nullish(),
});

export default taskBaseSchema;
