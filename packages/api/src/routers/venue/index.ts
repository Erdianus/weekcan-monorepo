import { router } from 'react-query-kit';
import z from 'zod';

import { auth } from '@repo/auth';
import Axios, { headerAuth } from '@repo/utils/axios';

import { Meta } from '../meta';
import { venueBaseSchema, venueFormSchema } from './schema';

type Venue = z.infer<typeof venueBaseSchema>;
const venue = router('venue', {
  all: router.query({
    fetcher: async (variables?: {
      search?: string | null;
      paginate?: string | null;
      page?: string | null | number;
    }) => {
      const headers = await headerAuth(auth());
      const res = await Axios('/venue', { params: variables, headers });

      return res.data as { data: Venue[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variable: { id: string }) => {
      const headers = await headerAuth(auth());
      const res = await Axios(`/venue/${variable.id}`, { headers });

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
    mutationFn: async (variable: { id: string; data: z.infer<typeof venueFormSchema> }) => {
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
