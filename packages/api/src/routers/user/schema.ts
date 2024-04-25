import { z } from "zod";

const userBaseSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Tolong Isi Nama"),
  username: z.string().min(1, "Tolong Isi Nama Pengguna"),
  email: z
    .string()
    .optional()
    .refine(
      (email) => {
        if (!email) return true;
        const regEmail = new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
        return regEmail.test(email);
      },
      { message: "Email Tidak Sesuai" },
    ),
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
    }, {invalid_type_error: 'Tolong Pilih Jabatan'}),
    company: z
      .object({
        label: z.string(),
        value: z.string(),
      }, {invalid_type_error: 'Tolong Pilih Perusahaan'})
      .array().min(1, "Pilih Minimal 1 Perusahaan"),
    company_id: z.string().array(),
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
