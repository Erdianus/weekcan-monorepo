import { router } from "react-query-kit";
import { z } from "zod";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../meta";
import userBaseSchema from "../user/schema";
import { absentBaseSchema } from "./schema";

const absentSchema = absentBaseSchema.extend({
  name: z.string(),
  file_link: z.string(),
  user: userBaseSchema,
});

const absent = router("absent", {
  all: router.query({
    fetcher: async (variables?: {
      user_id?: string;
      search?: string;
      type?: string;
      from?: string;
      to?: string;
      page?: string | number;
      paginate?: string | number;
    }) => {
      const res = await Axios("/absent", { params: variables });

      return res.data as {
        data: z.infer<typeof absentSchema>[];
        meta: Meta;
      };
    },
  }),
  single: router.query({
    fetcher: async (variables: { id: string | number }) => {
      const res = await Axios(`/absent/${variables.id}`);

      return res.data as {
        data: z.infer<typeof absentSchema>;
      };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: {
      user_id: number;
      date: string;
      type_of_absent: string;
      desc: string;
      file_path?: File;
    }) => {
      const res = await Axios.post("/absent", variables, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string | number }) => {
      const res = await Axios.delete(`/absent/${variables.id}`);

      return res.data as { message: string };
    },
  }),
});

export default absent;
