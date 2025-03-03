import { router } from "react-query-kit";

import Axios from "@hktekno/utils/axios";

import { Meta } from "../meta";

type ItemVendor = {
  id: number;
  vendor_id: number;
  name: string;
  qty: number;
  unit_of_qty: string;
  price: number;
  desc: string;
};

type Vendor = {
  id: number;
  name: string;
  slug: string;
  no_tlp: string;
  email: string;
  address: string;
  instagram?: string | null;
  tiktok?: string | null;
  facebook?: string | null;
  item_vendors: ItemVendor[];
  item_vendor: ItemVendor[];
};

const vendor = router("vendor", {
  all: router.query({
    fetcher: async (variables: { search?: string }) => {
      const res = await Axios(`/vendor`, { params: variables });

      return res.data as { data: Vendor[]; meta: Meta };
    },
  }),
  single: router.query({
    fetcher: async (variables: { slug: string }) => {
      const res = await Axios(`/vendor/${variables.slug}`);

      return res.data as { data: Vendor };
    },
  }),
  create: router.mutation({
    mutationFn: async (variables: {
      data: {
        name: string;
        no_tlp: string;
        email: string;
        address: string;
        instagram?: string;
        tiktok?: string;
        facebook?: string;
        item_vendors: {
          name: string;
          qty: number;
          unit_of_qty: string;
          price: number;
          desc: string;
        }[];
      };
    }) => {
      const res = await Axios.post(`/vendor`, variables.data);

      return res.data as { message: string };
    },
  }),
  update: router.mutation({
    mutationFn: async (variables: {
      slug: string;
      data: {
        name: string;
        no_tlp: string;
        email: string;
        address: string;
        instagram?: string;
        tiktok?: string;
        facebook?: string;
        item_vendors: {
          name: string;
          qty: number;
          unit_of_qty: string;
          price: number;
          desc: string;
        }[];
      };
    }) => {
      const res = await Axios.put(`/vendor/${variables.slug}`, variables.data);

      return res.data as { message: string };
    },
  }),
  delete: router.mutation({
    mutationFn: async (variables: { slug: string }) => {
      const res = await Axios.delete(`/vendor/${variables.slug}`);

      return res.data as { message: string };
    },
  }),
});

export { vendor };
