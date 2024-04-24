import z from "zod";
import { roleBaseSchema } from "./schema";
import { router } from "react-query-kit";
import Axios from "@repo/utils/axios";
import { Meta } from "../meta";

type Role = z.infer<typeof roleBaseSchema>;

const role = router("role", {
  all: router.query({
    fetcher: async (variables?: { search?: string; page?: number }) => {
      const res = await Axios("/roles", {params: variables});

      return res.data as { data: Role[]; meta: Meta };
    },
  }),
});

export { type Role };

export default role;
