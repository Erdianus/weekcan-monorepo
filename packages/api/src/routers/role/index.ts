import type z from "zod";
import { router } from "react-query-kit";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../meta";
import type { roleBaseSchema } from "./schema";

type Role = z.infer<typeof roleBaseSchema>;

const role = router("role", {
  all: router.query({
    fetcher: async (variables?: { search?: string; page?: number }) => {
      const res = await Axios("/roles", { params: variables });

      return res.data as { data: Role[]; meta: Meta };
    },
  }),
});

export { type Role };

export default role;
