import type { z } from "zod";
import { router } from "react-query-kit";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../meta";
import type jobBaseSchema from "./schema";

const job = router("job", {
  all: router.query({
    fetcher: async (variables?: {
      search?: string;
      status?: string;
      event?: string;
      vendor?: string;
      pic?: string;
    }) => {
      const res = await Axios("/list-jobs", { params: variables });

      return res.data as { data: z.infer<typeof jobBaseSchema>[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variables: { id: string }) => {
      const res = await Axios(`/list-job/${variables.id}`);

      return res.data as { data: z.infer<typeof jobBaseSchema> };
    },
  }),
});

export default job;
