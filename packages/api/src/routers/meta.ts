import z from "zod";

const metaSchema = z.object({
  current_page: z.number(),
  from: z.number(),
  last_page: z.number(),
  path: z.string(),
  per_page: z.number(),
  to: z.number(),
  total: z.number(),
  links: z.object({
    url: z.string().nullable(),
    label: z.string(),
    active: z.boolean(),
  }).array()
});


type Meta = z.infer<typeof metaSchema>;

export {
  type Meta
}
