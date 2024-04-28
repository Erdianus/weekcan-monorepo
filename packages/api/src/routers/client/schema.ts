import z from 'zod';

const clientBaseSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Tolong Isi Nama Tempat'),
});

const clientFormSchema = clientBaseSchema.pick({ name: true });

export { clientBaseSchema, clientFormSchema };
