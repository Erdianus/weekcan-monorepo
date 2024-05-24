import { router } from "react-query-kit";

import Axios from "@hktekno/utils/axios";

const item = {
  all: router.query({
    fetcher: async (variables?: {
      page?: number | string;
      search?: string;
    }) => {
      const res = await Axios("/item", { params: variables });

      return res.data;
    },
  }),
};

export default item;
