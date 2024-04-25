import Axios from "@repo/utils/axios";
import { router } from "react-query-kit";
import companyBaseSchema, { companyFormSchema as companyForm } from "./schema";
import z from "zod";
import userBaseSchema from "../user/schema";
import { Meta } from "../meta";

const companySchema = companyBaseSchema.extend({
  picture_link: z.string().nullish(),
  user: userBaseSchema.array(),
});

type Company = z.infer<typeof companySchema>;

// --NOTE: FORM
const companyFormSchema = companyForm.omit({ owner: true });

const company = router("company", {
  all: router.query({
    fetcher: async (variables?: {
      search?: string | null;
      page?: number | string | null;
      paginate?: string | null;
      project_id?: string | number;
      owner_id?: string | number;
    }) => {
      const res = await Axios("/company", { params: variables });

      return res.data as { data: Company[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variables: { id: string | number }) => {
      const res = await Axios(`/user/${variables.id}`);

      return res.data as { data: Company };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: {
      data: z.infer<typeof companyFormSchema>;
    }) => {
      const res = await Axios.post(`/company`, variables.data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      id: string | number;
      data: z.infer<typeof companyFormSchema>;
    }) => {
      const res = await Axios.post(`/company/${variables.id}`, variables.data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string | number }) => {
      const res = await Axios.delete(`/company/${variables.id}`);

      return res.data as { message: string };
    },
  }),
});

export { type Company };

export default company;
