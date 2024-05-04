import { router } from "react-query-kit";
import { z } from "zod";

import Axios from "@hktekno/utils/axios";

import type { Meta } from "../meta";
import companyBaseSchema from "../company/schema";
import { roleBaseSchema } from "../role/schema";
import userBaseSchema, {
  userCreateFormSchema,
  userUpdateFormSchema,
} from "./schema";

const userSchema = userBaseSchema.extend({
  role_name: z.string(),
  role: roleBaseSchema,
  company: companyBaseSchema.array(),
});

type User = z.infer<typeof userSchema>;

//--NOTE: FORM
const userCreateForm = userCreateFormSchema.omit({ company: true, role: true });
const userUpdateForm = userUpdateFormSchema.omit({ company: true, role: true });

const user = router("user", {
  all: router.query({
    fetcher: async (variables?: {
      search?: string | null;
      page?: number | string | null;
      paginate?: string | null;
      company_id?: string[] | null;
      company_name?: string[] | null;
      isOwner?: boolean;
    }) => {
      const res = await Axios("/user", {
        params: { ...variables, company_id: variables?.company_id },
      });

      return res.data as { data: User[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variables: { id: string | number }) => {
      const res = await Axios(`/user/${variables.id}`);

      return res.data as { data: User };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: z.infer<typeof userCreateForm>) => {
      const res = await Axios.post(`/user`, variables);

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      id: string | number;
      data: z.infer<typeof userUpdateForm>;
    }) => {
      const res = await Axios.put(
        `/user/update/${variables.id}`,
        variables.data,
      );

      return res.data as { message: string };
    },
  }),
  update_picture: router.mutation({
    mutationFn: async (variables: {
      id: string | number;
      picture_path: File;
    }) => {
      const res = await Axios.post(`/user/${variables.id}`, {
        picture_path: variables.picture_path,
      });

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { id: string | number }) => {
      const res = await Axios.delete(`/user/${variables.id}`);

      return res.data as { message: string };
    },
  }),
});

export { type User };

export default user;
