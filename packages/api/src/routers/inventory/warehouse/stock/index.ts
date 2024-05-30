import { router } from "react-query-kit";
import { z } from "zod";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../../../meta";
import stockBaseSchema from "./schema";

const stockSchema = stockBaseSchema.extend({
  warehouse: z.string(),
});

// NOTE: FORM
type Form = {
  warehouse_id: string;
  item_id: string;
  qty: number;
  ket: string;
  expired_date: string;
};

const stock = {
  all: router.query({
    fetcher: async (variables?: { search?: string; warehouse_id?: string }) => {
      const res = await Axios("/warehouse-item", { params: variables });

      return res.data as { data: z.infer<typeof stockSchema>[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variables: { id: string }) => {
      const res = await Axios(`/warehouse-item/${variables.id}`);

      return res.data as { data: z.infer<typeof stockSchema> };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: { data: Form }) => {
      const res = await Axios.post("/warehouse/add-items", variables.data);

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: { id: string; data: Form }) => {
      const res = await Axios.put(
        `/warehouse-item/${variables.id}`,
        variables.data,
      );

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: {
      data: { warehouse_id: string; item_id: string };
    }) => {
      const res = await Axios.delete(`/warehouse/remove-items`, {
        data: variables.data,
      });

      return res.data as { message: string };
    },
  }),
};

export default stock;
