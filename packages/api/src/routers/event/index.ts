import type { z } from "zod";
import { router } from "react-query-kit";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../meta";
import type eventBaseSchema from "./schema";

type Event = z.infer<typeof eventBaseSchema> & {
  all_pic: string;
  all_pic_design: string;
  all_data_pic: { id: number; name: string }[];
  all_data_pic_design: { id: number; name: string }[];
  all_pic_id: number[];
  all_pic_design_id: number[];
  event_type: string;
  tax_type: number;
};

const eventRouter = {
  all: router.query({
    fetcher: async (variables?: {
      search?: string;
      page?: number | string;
      paginate?: number | string;
    }) => {
      const res = await Axios.get("/events", { params: variables });

      return res.data as { data: Event[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variables: { slug: string }) => {
      const res = await Axios.get(`/event/${variables.slug}`);

      return res.data as { data: Event };
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
  create: router.mutation({
    mutationFn: async (variables: {
      data: {
        name: string;
        event_type: string;
        pic: (number | string)[];
        pic_design: (number | string)[];
        start_date: string;
        end_date: string;
        venue: string;
        client: string;
        city: string;
        province: string;
        status: string;
        company_id: string | number;
        tax_type: string | number;
      };
    }) => {
      const res = await Axios.post(`/event`, variables.data);

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      slug: string;
      data: {
        name: string;
        event_type: string;
        pic: (number | string)[];
        pic_design: (number | string)[];
        start_date: string;
        company_id: string | number;
        end_date: string;
        venue: string;
        client: string;
        city: string;
        province: string;
        status: string;
        tax_type: string | number;
      };
    }) => {
      const res = await Axios.put(`/event/${variables.slug}`, variables.data);

      return res.data as { message: string };
    },
  }),
  companyFinance: router.query({
    fetcher: async ({
      params,
    }: {
      params?: {
        search?: string;
        page?: number | string;
        paginate?: string | number;
      };
    }) => {
      const res = await Axios("/company-finance", { params });

      return res.data as {
        data: { id: number; name: string }[];
        meta: Meta;
      };
    },
  }),
};

const event = router("event", eventRouter);

export { eventRouter };

export default event;
