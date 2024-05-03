import type z from "zod";
import Axios from "@repo/utils/axios";
import { router } from "react-query-kit";

import type { Meta } from "../../meta";
import type detailBaseSchema from "./schema";
import { detailFormSchema } from "./schema";

type DetailProject = z.infer<typeof detailBaseSchema>;

// --NOTE: FORM
const detailForm = detailFormSchema.array();

const detail = {
  all: router.query({
    fetcher: async (variables: {
      project_id: string | number;
      page?: number | string | null;
      paginate?: number | string | null;
      search?: string | null;
    }) => {
      const res = await Axios("/detail-project", { params: variables });

      return res.data as { data: DetailProject[]; meta: Meta };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: { data: z.infer<typeof detailForm> }) => {
      const res = await Axios.post("/detail-project", { data: variables.data });

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      id: string | number;
      data: z.infer<typeof detailFormSchema>;
    }) => {
      const res = await Axios.put(
        `/detail-project/${variables.id}`,
        variables.data,
      );

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string | number }) => {
      const res = await Axios.delete(`/detail-project/${variables.id}`);

      return res.data as { message: string };
    },
  }),
};

export default detail;
