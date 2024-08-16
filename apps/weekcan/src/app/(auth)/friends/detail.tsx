"use client";

import { BookUser, Mail, Phone } from "lucide-react";

import { k } from "@hktekno/api";
import { ItemDetail } from "@hktekno/ui/components/item-detail";
import { Facebook, Instagram, Tiktok, Twitter } from "@hktekno/ui/icon";
import useUserStore from "@hktekno/ui/lib/store/useUserStore";

export default function Detail() {
  const id = useUserStore((s) => Number(s.friends_id));
  const { data: company } = k.company.single.useQuery({
    variables: { id },
  });
  return (
    <>
      <ItemDetail
        icon={BookUser}
        label={"Alamat"}
        value={company?.data.address ?? "-"}
      />
      <ItemDetail icon={Mail} label={"Email"} value={company?.data.email} />
      <ItemDetail
        icon={Instagram}
        label={"Instagram"}
        value={company?.data.instagram ?? "-"}
      />
      <ItemDetail
        icon={Twitter}
        label={"Twitter"}
        value={company?.data.twitter ?? "-"}
      />
      <ItemDetail
        icon={Facebook}
        label={"Facebook"}
        value={company?.data.facebook ?? "-"}
      />
      <ItemDetail
        icon={Tiktok}
        label={"Tiktok"}
        value={company?.data.tiktok ?? "-"}
      />
      <ItemDetail
        icon={Phone}
        label={"No. Telp/HP"}
        value={company?.data.no_telp ?? "-"}
      />
    </>
  );
}
