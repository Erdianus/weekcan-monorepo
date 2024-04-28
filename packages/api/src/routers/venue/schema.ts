import z from 'zod';

const venueBaseSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Tolong Isi Nama Tempat'),
});

const venueFormSchema = venueBaseSchema.pick({ name: true });

export { venueBaseSchema, venueFormSchema };
