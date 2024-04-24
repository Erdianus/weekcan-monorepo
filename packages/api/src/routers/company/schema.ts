import {z} from 'zod';

const companyBaseSchema = z.object({
  id: z.number(),
  company_name: z.string().min(1, 'Tolong Isi Nama Perusahaan'),
  address: z.string().min(1, "Tolong Isi Alamat").optional(),
  email: z.string().email().min(1, "Tolong Isi Email"),
  instagram: z.string().min(1, "Tolong Isi Akun Instagram").optional(),
  facebook: z.string().min(1, "Tolong Isi Akun Facebook").optional(),
  twitter: z.string().min(1, "Tolong Isi Akun Twitter").optional(),
  tiktok: z.string().min(1, "Tolong Isi Akun Tiktok").optional(),
  no_telp: z.string().min(1, "Tolong Isi No. Telepon").optional(),
  picture_path: z.union([z.string(), z.instanceof(File)]),
  owner_id: z.string().min(1, "Tolong Pilih Pemilik Perusahaan"),
})

// --NOTE: FORM
const companyFormSchema = companyBaseSchema.pick({
  company_name: true,
  email: true,
  picture_path: true,
  owner_id: true,
  address: true,
  instagram: true,
  facebook: true,
  twitter: true,
  no_telp: true,
});

export {
  companyBaseSchema,
  companyFormSchema
}

export default companyBaseSchema;

