import z from 'zod';

const sprintBaseSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Tolong Masukkan Judul'),
  start_date: z.string().min(1, 'Tolong Pilih Tanggal'),
  end_date: z.string().min(1, 'Tolong Pilih Tanggal'),
  is_now: z.boolean(),
});

const sprintFormSchema = sprintBaseSchema
  .pick({
    title: true,
    start_date: true,
    end_date: true,
  })
  .extend({
    project_id: z.string(),
  });

export { sprintFormSchema };

export default sprintBaseSchema;
