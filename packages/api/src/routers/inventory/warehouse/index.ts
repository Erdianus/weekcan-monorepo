import type { z } from "zod";
import { router } from "react-query-kit";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../../meta";
import companyBaseSchema from "../../company/schema";
import warehouseBaseSchema from "./schema";

const warehouseSchema = warehouseBaseSchema.extend({
  company: companyBaseSchema,
});

const warehouse = {
  all: router.query({
    fetcher: async (variables?: { search: string }) => {
      const res = await Axios("/warehouse", { params: variables });

      return res.data as {
        data: z.infer<typeof warehouseSchema>[];
        meta: Meta;
      };
    },
  }),
  single: router.query({
    fetcher: async (variables: { id: string }) => {
      const res = await Axios(`/warehouse/${variables.id}`);

      return res.data as { data: z.infer<typeof warehouseSchema> };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: {
      data: { name: string; company_id: string | number };
    }) => {
      const res = await Axios.post(`/warehouse`, variables.data);

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      id: string;
      data: { name: string; company_id: string | number };
    }) => {
      const res = await Axios.put(`/warehouse/${variables.id}`, variables.data);

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string }) => {
      const res = await Axios.delete(`/warehouse/${variables.id}`);

      return res.data as { message: string };
    },
  }),
};

export default warehouse;
