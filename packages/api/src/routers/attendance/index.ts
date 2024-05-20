import { router } from "react-query-kit";

import Axios from "@hktekno/utils/axios";

const attendance = router("attendance", {
  create: router.mutation({
    mutationFn: async (variables: {
      data: {
        user_id: string;
        latitude: number;
        longtitude: number;
        picture_path: string;
        ket?: string;
        status: string;
        time: string;
        date: string;
      };
    }) => {
      const res = await Axios.post("/attendance", variables.data);

      return res.data as { message: string };
    },
  }),
});

export default attendance;
