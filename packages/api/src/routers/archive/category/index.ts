import type { z } from "zod";
import { router } from "react-query-kit";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../../meta";
import { archiveCategoryBaseSchema } from "./schema";

const categorySchema = archiveCategoryBaseSchema;

const category = {
  all: router.query({
    fetcher: async (variables: { company_id: number[] }) => {
      const res = await Axios("/archive/category", { params: variables });

      return res.data as { data: z.infer<typeof categorySchema>[]; meta: Meta };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: {
      archive_name: string;
      archive_input: string;
      havePicture: boolean;
      company_id: string | number;
      icon?: string;
    }) => {
      const res = await Axios.post("/archive/category/store", variables);

      return res.data as {
        data: z.infer<typeof categorySchema>;
        message: string;
      };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      id: string | number;
      data: {
        archive_name: string;
        archive_input: string;
        havePicture: boolean;
        company_id: string | number;
        icon?: string;
      };
    }) => {
      const res = await Axios.post(
        `/archive/category/update/${variables.id}`,
        variables.data,
      );

      return res.data as {
        data: z.infer<typeof categorySchema>;
        message: string;
      };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string | number }) => {
      const res = await Axios.post(`/archive/category/delete/${variables.id}`);

      return res.data as {
        data: z.infer<typeof categorySchema>;
        message: string;
      };
    },
  }),
};

export default category;
