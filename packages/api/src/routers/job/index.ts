import type { z } from "zod";
import { router } from "react-query-kit";

import Axios, { AxiosFinance } from "@hktekno/utils/axios";

import type { Meta } from "../meta";
import type jobBaseSchema from "./schema";

const job = router("job", {
  all: router.query({
    fetcher: async (variables: {
      slug: string;
      params?: {
        search?: string;
        status?: string;
        event?: string;
        vendor?: string;
        pic?: string;
        pic_id?: string;
      };
    }) => {
      const res = await Axios(`/${variables.slug}/list-jobs`, {
        params: variables.params,
      });

      return res.data as { data: z.infer<typeof jobBaseSchema>[]; meta: Meta };
    },
  }),
  all_infinity: router.infiniteQuery({
    fetcher: async (
      variables: {
        search?: string;
        status?: string;
        event?: string;
        vendor?: string;
        pic?: string;
        pic_id?: string;
      },
      { pageParam },
    ) => {
      const res = await Axios("/list-jobs", {
        params: { ...variables, page: pageParam },
      });

      return res.data as { data: z.infer<typeof jobBaseSchema>[]; meta: Meta };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.current_page === lastPage.meta.current_page)
        return null;

      return lastPage.meta.current_page + 1;
    },
    initialPageParam: 1,
  }),
  single: router.query({
    fetcher: async (variables: { id: string }) => {
      const res = await Axios(`/list-job/${variables.id}`);

      return res.data as { data: z.infer<typeof jobBaseSchema> };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: { id: string; data: { status: string } }) => {
      const res = await Axios.put(`/list-job/${variables.id}`, variables.data);

      return res.data as { message: string };
    },
  }),
  picture: {
    list: router.query({
      fetcher: async (variables: {
        slug: string;
        params?: {
          status?: string;
          paginate?: string | number;
          page?: string | number;
        };
      }) => {
        const res = await AxiosFinance(`/list-job/${variables.slug}/picture`, {
          params: variables.params,
        });

        return res.data as {
          data: {
            id: number;
            list_job_id: number;
            picture_path: string;
            image_url: string;
          }[];
        };
      },
    }),

    upload: router.mutation({
      mutationFn: async (variables: {
        data: {
          picture: File[];
          /* picture: {
            uri: string;
            name: string;
            type: string;
          }[]; */
        };
        slug: string;
      }) => {
        // const formData = toFormData(variables.data);
        const res = await AxiosFinance.post(
          `/list-job/${variables.slug}/upload-picture`,
          variables.data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        return res.data as { message: string };
      },
    }),
    delete: router.mutation({
      mutationFn: async (variables: { id: string | number }) => {
        const res = await AxiosFinance.delete(
          `/list-job/delete-picture/${variables.id}`,
          {
            headers: {
              Accept: "application/json",
            },
          },
        );

        return res.data as { message: string };
      },
    }),
  },
});

export default job;
