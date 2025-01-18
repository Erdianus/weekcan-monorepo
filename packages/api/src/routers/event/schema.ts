import { z } from "zod";

const eventStatus = [
  "Pitching Concept",
  "On Going",
  "In Preparation",
  "Done",
  "Pending",
  "Cancel",
];

const eventBaseSchema = z.object({
  id: z.number(),
  name: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  pic: z.string(),
  venue: z.string(),
  status: z.string(),
  city: z.string(),
  province: z.string(),
  client: z.string(),
  slug: z.string(),
});

export { eventStatus };

export default eventBaseSchema;
