import z from 'zod';

const projectStatus = ['Approved', 'Konsep', 'Pitching'];
const projectProgress = ['On Going', 'Done', 'Cancel', 'Pending'];
const projectType = ['Internal', 'Eksternal'];

const projectBaseSchema = z.object({
  id: z.number(),
  project_name: z.string().min(1, 'Tolong Isi Nama Proyek'),
  desc: z.string().min(1, 'Tolong Isi Deskripsi'),
  start_date: z.string().min(1, 'Tolong Isi Tanggal'),
  end_date: z.string().nullish(),
  pic: z.union([z.string().min(1, 'Tolong Pilih PIC'), z.number().positive('Tolong Pilih PIC')]),
  venue_id: z.union([z.string().min(1, 'Tolong Pilih PIC'), z.number().positive('Tolong Pilih PIC')]).nullish(),
  client_id: z.union([z.string().min(1, 'Tolong Pilih PIC'), z.number().positive('Tolong Pilih PIC')]).nullish(),
  city: z.string().min(1, 'Tolong Pilih Kota').nullish(),
  province: z.string().min(1, 'Tolong Pilih Kota').nullish(),
  status: z.string().min(1, 'Tolong Pilih Status'),
  progress: z.string().min(1, 'Tolong Pilih Progres'),
  type: z.string().min(1, 'Tolong Pilih Tipe'),
});

// --NOTE: FORM
const projectFormSchema = projectBaseSchema
  .pick({
    project_name: true,
    desc: true,
    start_date: true,
    end_date: true,
    pic: true,
    venue_id: true,
    client_id: true,
    city: true,
    province: true,
    status: true,
    progress: true,
    type: true,
  })
  .extend({
    company_id: z.string().array().min(1, 'Tolong Pilih Perusahaan'),
    company: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .array()
      .min(1, 'Tolong Pilih Perusahaan'),
    picSelect: z.object(
      {
        label: z.string(),
        value: z.string(),
      },
      { invalid_type_error: 'Tolong Pilih PIC' },
    ),
    venue: z.string().optional(),
    client: z.string().optional(),
    venue_select: z.object(
      {
        label: z.string(),
        value: z.string(),
        __isNew__: z.boolean().optional(),
      },
      { invalid_type_error: 'Tolong Pilih Tempat' },
    ),
    client_select: z.object(
      {
        label: z.string(),
        value: z.string(),
        __isNew__: z.boolean().optional(),
      },
      { invalid_type_error: 'Tolong Pilih Klien' },
    ),
  });

export { projectFormSchema, projectStatus, projectProgress, projectType };

export default projectBaseSchema;
