import { router } from "react-query-kit";
import { z } from "zod";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../../meta";
import itemBaseSchema from "./schema";

const itemSchema = itemBaseSchema.extend({
  warehouse_item: z
    .object({
      id: z.number(),
      name: z.string(),
      company_id: z.string(),
      warehouse_item: z.object({
        qty: z.string(),
        ket: z.string(),
        expired_date: z.string(),
      }),
    })
    .array(),
});

// FORM:
type FormCreate = {
  name: string;
  unit: string;
  code: string;
  date: string;
  category: string;
  picture_path?: File | null;
  warehouse_stock: {
    warehouse_id: string;
    qty: number;
    ket: string;
    expired_date: string;
  }[];
};

const item = {
  all: router.query({
    fetcher: async (variables?: {
      page?: number | string;
      paginate?: number | string;
      search?: string;
      not_in_warehouse?: string;
    }) => {
      const res = await Axios("/item", { params: variables });

      return res.data as { data: z.infer<typeof itemSchema>[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variables: { id: string }) => {
      const res = await Axios(`/item/${variables.id}`);

      return res.data as { data: z.infer<typeof itemSchema> };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: { data: FormCreate }) => {
      const res = await Axios.post(`/item`, variables.data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      id: string;
      data: {
        name: string;
        unit: string;
        picture_path?: File | null;
      };
    }) => {
      const res = await Axios.post(
        `/item/update/${variables.id}`,
        variables.data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string }) => {
      const res = await Axios.delete(`/item/${variables.id}`);

      return res.data as { message: string };
    },
  }),
};

export default item;
