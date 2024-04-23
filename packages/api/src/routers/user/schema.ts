import {z} from 'zod';

const userBaseSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Tolong Isi Nama"),
  username: z.string().min(1, "Tolong Isi Nama Pengguna"),
  email: z.string().min(1, "Tolong Isi Nama Email").email('Bukan Format Email').optional(),
  role_id: z.string().min(1, 'Tolong Pilih Jabatan'),
  job_type_id: z.string().min(1, "Tolong Pilih Tipe Pekerjaan").optional(),
  picture_path: z.string().optional(),
})

export {
  userBaseSchema,
}

export default userBaseSchema;
