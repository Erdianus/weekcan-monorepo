import type { z } from "zod";
import { router } from "react-query-kit";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../meta";
import eventBaseSchema from "./schema";

const eventSchema = eventBaseSchema;

const eventRouter = {
  all: router.query({
    fetcher: async (variables?: {
      search?: string;
      page?: number | string;
      paginate?: number | string;
    }) => {
      const res = await Axios.get("/events", { params: variables });

      return res.data as { data: z.infer<typeof eventSchema>[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variables: { id: string }) => {
      const res = await Axios.get(`/event/${variables.id}`);

      return res.data as { data: z.infer<typeof eventSchema> };
    },
  }),
  list_job: router.infiniteQuery({
    fetcher: async (
      variables: { event_id: string; params?: { search?: string } },
      { pageParam },
    ) => {
      const res = await Axios.get(`/event/${variables.event_id}/list-job`, {
        params: {
          ...variables.params,
          page: pageParam,
        },
      });

      return res.data as {
        data: {
          name: string;
          jabatan: string;
          jobNoProgress: number;
          jobKoordinasi: number;
          jobKonfirmasi: number;
          jobLoading: number;
          jobDone: number;
          jobCancel: number;
        }[];
        meta: {
          total: number;
          current_page: number;
          last_page: number;
          per_page: number;
        };
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.current_page === lastPage.meta.current_page)
        return null;

      return lastPage.meta.current_page + 1;
    },
    initialPageParam: 1,
  }),
};

const event = router("event", eventRouter);

export { eventRouter };

export default event;
