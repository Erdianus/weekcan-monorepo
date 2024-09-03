import type { z } from "zod";
import { router } from "react-query-kit";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../meta";
import category from "./category";
import archiveBaseSchema from "./schema";

const archiveSchema = archiveBaseSchema.extend({});

const archive = router("archive", {
  all: router.query({
    fetcher: async (variables?: {
      page?: number | string;
      category_id?: string;
      company_id?: string;
      text: string;
      sub_categories?: string[];
      province?: string;
      paginate?: string | number;
    }) => {
      const res = await Axios("/archive", { params: variables });

      return res.data as { data: z.infer<typeof archiveSchema>[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variables: { id: string | number }) => {
      const res = await Axios(`/archive/${variables.id}`);
      return res.data as { data: z.infer<typeof archiveSchema> };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: {
      data: {
        has_picture: number;
        archive_details: unknown;
        province: string;
        city: string;
      };
    }) => {
      const res = await Axios.post("/archive/store", variables.data);

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      id: string | number;
      data: {
        archive_details: unknown;
        archive_category_id: number;
        province: string;
        city: string;
        has_picture: number;
        delete_pictures?: {
          id: number;
          filename: string;
          picture_path: string;
        };
      };
    }) => {
      const res = await Axios.post(
        `/archive/update/${variables.id}`,
        variables.data,
      );

      return res.data as {
        data: z.infer<typeof archiveSchema>;
        message: string;
        status: number;
      };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string | number }) => {
      const res = await Axios.post(`/archive/delete/${variables.id}`);

      return res.data as { message: string };
    },
  }),
  deleteBatch: router.mutation({
    mutationFn: async (variables: { archive_ids: number[] }) => {
      const res = await Axios.post("/archive/deleteBatch", variables);

      return res.data as { message: string };
    },
  }),
  category,
});

export default archive;
