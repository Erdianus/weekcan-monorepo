import { z } from "zod";

const taskStatus = ["On Going", "Done", "Pending"];

const taskProjectBaseSchema = z.object({
  id: z.number(),
  task_name: z.string().min(1, "Tolong Isi Nama Kerjaan"),
  desc: z.string().min(1, "Tolong Isi Deskripsi"),
  start_date: z.string().min(1, "Tolong Isi Tanggal"),
  end_date: z.string().min(1, "Tolong Isi Tanggal"),
  task_for: z.string().min(1, "Tolong Pilih Tugas Siapa"),
  project_id: z.string().min(1, "Tolong Pilih Proyek"),
  sprint_id: z.string().nullish(),
  task_status: z.string().min(1, "Tolong Pilih Status").default("On Going"),
  have_daily_task: z.union([z.literal(0), z.literal(1)]),
  set_by: z.string().nullish(),
});

// NOTE: FORM
const taskProjectFormSchema = taskProjectBaseSchema.pick({
  task_name: true,
  desc: true,
  project_id: true,
  sprint_id: true,
  task_for: true,
  start_date: true,
  end_date: true,
  task_status: true,
  have_daily_task: true,
});

export { taskStatus, taskProjectFormSchema, taskProjectBaseSchema };

export default taskProjectBaseSchema;
