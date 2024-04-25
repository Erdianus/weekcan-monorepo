import { z } from "zod";

const companyBaseSchema = z.object({
  id: z.number(),
  company_name: z.string().min(1, "Tolong Isi Nama Perusahaan"),
  address: z.string().min(1, "Tolong Isi Alamat").optional(),
  email: z
    .string()
    .min(1, "Tolong Isi Email")
    .refine(
      (email) => {
        const regEmail = new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
        return regEmail.test(email);
      },
      { message: "Email Tidak Sesuai" },
    ),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  tiktok: z.string().optional(),
  no_telp: z
    .string()
    .min(1, "Tolong Isi No. Telepon")
    .optional()
    .refine(
      (phone) => {
        if (!phone) return true;
        const regexPhone = new RegExp(
          /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
        );
        return regexPhone.test(phone);
      },
      { message: "Nomor Telepon Tidak Sesuai" },
    ),
  picture_path: z.union([z.string().min(1, "Tolong Pilih Gambar"), z.instanceof(File)]),
  owner_id: z.string().min(1, "Tolong Pilih Pemilik Perusahaan"),
});

// --NOTE: FORM
const companyFormSchema = companyBaseSchema
  .pick({
    company_name: true,
    email: true,
    picture_path: true,
    owner_id: true,
    address: true,
    instagram: true,
    facebook: true,
    twitter: true,
    tiktok: true,
    no_telp: true,
  })
  .extend({
    owner: z.object({
      label: z.string(),
      value: z.string(),
    }, {invalid_type_error: 'Tolong Pilih Pemilik Perusahaan'}),
  });

export { companyBaseSchema, companyFormSchema };

export default companyBaseSchema;
