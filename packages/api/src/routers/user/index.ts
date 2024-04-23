import Axios from "@repo/utils/axios";
import { router } from "react-query-kit";
import userBaseSchema from "./schema";
import { z } from "zod";

const userSchema = userBaseSchema.extend({
  role_name: z.string(),
});

type User = z.infer<typeof userSchema>;

const user = router("user", {
  all: router.query({
    fetcher: async () => {
      const res = await Axios("/user");

      return res.data as { data: User[] };
    },
  }),
});

export { type User };

export default user;
