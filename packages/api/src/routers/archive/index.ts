import type { z } from "zod";
import { router } from "react-query-kit";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../meta";
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
});

export default archive;
