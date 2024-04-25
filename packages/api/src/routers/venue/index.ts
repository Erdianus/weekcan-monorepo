import Axios from "@repo/utils/axios";
import { router } from "react-query-kit";
import z from "zod";
import { venueBaseSchema, venueFormSchema } from "./schema";
import { Meta } from "../meta";

type Venue = z.infer<typeof venueBaseSchema>;
const venue = router("venue", {
  all: router.query({
    fetcher: async () => {
      const res = await Axios("/venue");

      return res.data as { data: Venue[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variable: { id: string }) => {
      const res = await Axios(`/venue/${variable.id}`);

      return res.data as { data: Venue };
    },
  }),
  create: router.mutation({
    mutationFn: async (variable: { data: z.infer<typeof venueFormSchema> }) => {
      const res = await Axios.post(`/venue`, variable.data);

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variable: {
      id: string;
      data: z.infer<typeof venueFormSchema>;
    }) => {
      const res = await Axios.put(`/venue/${variable.id}`, variable.data);

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variable: { id: string }) => {
      const res = await Axios.delete(`/venue/${variable.id}`);

      return res.data as { message: string };
    },
  }),
});

export default venue;
