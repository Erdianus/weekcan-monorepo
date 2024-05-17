"use client";

import { BookUser, Mail, Phone } from "lucide-react";

import { k } from "@hktekno/api";
import { ItemDetail } from "@hktekno/ui/components/item-detail";
import { Facebook, Instagram, Tiktok, Twitter } from "@hktekno/ui/icon";

const DetailCompany = ({ id }: { id: string }) => {
  const { data: company, isLoading } = k.company.single.useQuery({
    variables: { id },
  });
  return (
    <>
      <ItemDetail
        icon={BookUser}
        label={"Alamat"}
        isload={isLoading}
        value={company?.data.address ?? "-"}
      />
      <ItemDetail icon={Mail} label={"Email"} value={company?.data.email} />
      <ItemDetail
        icon={Instagram}
        label={"Instagram"}
        isload={isLoading}
        value={company?.data.instagram ?? "-"}
      />
      <ItemDetail
        icon={Twitter}
        label={"Twitter"}
        isload={isLoading}
        value={company?.data.twitter ?? "-"}
      />
      <ItemDetail
        icon={Facebook}
        label={"Facebook"}
        isload={isLoading}
        value={company?.data.facebook ?? "-"}
      />
      <ItemDetail
        icon={Tiktok}
        label={"Tiktok"}
        isload={isLoading}
        value={company?.data.tiktok ?? "-"}
      />
      <ItemDetail
        icon={Phone}
        label={"No. Telp/HP"}
        isload={isLoading}
        value={company?.data.no_telp ?? "-"}
      />
    </>
  );
};

export default DetailCompany;
