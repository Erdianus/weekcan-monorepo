import { z } from "zod";

const userBaseSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Tolong Isi Nama"),
  username: z.string().min(1, "Tolong Isi Nama Pengguna"),
  email: z.string().email("Bukan Format Email").optional(),
  role_id: z.string().min(1, "Tolong Pilih Jabatan"),
  job_type_id: z.string().min(1, "Tolong Pilih Tipe Pekerjaan").optional(),
  picture_path: z.string().optional(),
});

// --NOTE: FORM
const userFormSchema = userBaseSchema
  .pick({
    name: true,
    username: true,
    email: true,
    role_id: true,
  })
  .extend({
    role: z.object({
      label: z.string().optional(),
      value: z.string().optional(),
    }),
    company: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .array(),
    company_id: z.string().array().min(1, "Tolong Pilih Perusahaan"),
  });

const userCreateFormSchema = userFormSchema.extend({
  password: z.string().min(1, "Tolong Isi Password"),
  confirmation_password: z.string().min(1, "Tolong Isi Konfirmasi Password"),
});

const userUpdateFormSchema = userFormSchema;

type UserBase = z.infer<typeof userBaseSchema>;

export {
  userBaseSchema,
  userCreateFormSchema,
  userUpdateFormSchema,
  type UserBase,
};

export default userBaseSchema;
