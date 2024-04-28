import z from 'zod';

const fileBaseSchema = z.object({
  id: z.number(),
  project_id: z.string().min(1, 'Tolong Pilih Proyek'),
  label: z.string(),
  file_path: z.string(),
  is_permanent: z.boolean(),
  detail_task_id: z.union([z.string(), z.number()]).nullish(),
  file_link: z.string(),
});

// --NOTE: FORM
//
const fileFormSchema = fileBaseSchema
  .pick({
    project_id: true,
  })
  .extend({
    file: z.instanceof(File, { message: 'Tolong Upload File' }),
  });

export { fileFormSchema };

export default fileBaseSchema;
