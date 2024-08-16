import { router } from "react-query-kit";
import { z } from "zod";

import Axios from "@hktekno/utils/axios";

import userBaseSchema from "../user/schema";
import attendanceBaseSchema from "./schema";

const attendanceSchema = attendanceBaseSchema.extend({
  name: z.string(),
  picture_link: z.string(),
  user: userBaseSchema,
});

const attendance = router("attendance", {
  all: router.query({
    fetcher: async (variables?: {
      search?: string;
      page?: string | number;
      paginate?: string | number;
      from?: string;
      to?: string;
      isHavePicture?: number;
    }) => {
      const res = await Axios("/attendance", {
        params: { ...variables, isHavePicture: 1 },
      });

      return res.data as {
        data: {
          tanggal: string;
          attendances: z.infer<typeof attendanceSchema>[];
        }[];
        meta: {
          hasMore: boolean;
        };
      };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: {
      data: {
        user_id: string;
        latitude: number;
        longitude: number;
        picture_path: string;
        ket?: string;
        status: string;
        time: string;
        date: string;
        location_text: string;
      };
    }) => {
      const res = await Axios.post("/attendance", variables.data);

      return res.data as { message: string };
    },
  }),
});

export default attendance;
