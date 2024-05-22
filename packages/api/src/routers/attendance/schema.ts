import { z } from "zod";

const attendanceBaseSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  time: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  date: z.string(),
  picture_path: z.string(),
  status: z.string(),
  ket: z.string(),
  location_text: z.string(),
});

export default attendanceBaseSchema;
