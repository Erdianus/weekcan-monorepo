"use client";

import Link from "next/link";
import QRCode from "react-qr-code";

import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import Loading from "@hktekno/ui/components/loading";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { Card, CardContent } from "@hktekno/ui/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@hktekno/ui/components/ui/carousel";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import { shortName } from "@hktekno/ui/lib/utils";

const CarouselCompany = ({ user_id }: { user_id: string }) => {
  const { data: user } = k.user.single.useQuery({ variables: { id: user_id } });
  const { data: companies } = k.company.all.useQuery();
  return (
    <>
      <Carousel opts={{ align: "center", loop: true }}>
        <CarouselContent>
          {companies?.data.map((company) => (
            <CarouselItem
              key={`carousel-${company.id}`}
              className="md:basis-2/3"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="pt-2">
                    <div className="mb-4 flex items-center gap-4">
                      <Avatar className="h-12 w-12 md:h-20 md:w-20">
                        <AvatarImage src={company.picture_link ?? ""} />
                        <AvatarFallback>
                          {shortName(company.company_name)}
                        </AvatarFallback>
                      </Avatar>
                      <Link
                        href={`/corps/${company.id}/task`}
                        className="text-lg font-bold hover:underline md:text-2xl"
                      >
                        {company.company_name}
                      </Link>
                    </div>
                    <div className="flex w-full items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-28 w-24 rounded-xl">
                          <AvatarImage
                            className="h-28 w-24 object-cover"
                            src={user?.data.picture_link}
                          />
                          <AvatarFallback>
                            {shortName(user?.data.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-xl font-bold">
                          {user?.data.name}
                        </div>
                      </div>
                      <div className="bg-white p-2">
                        <QRCode
                          size={64}
                          value={`mailto:${user?.data.email}`}
                        />
                      </div>
                    </div>
                    <div className="flex w-full justify-end text-right text-xs">
                      <div>
                        <div>{company.address}</div>
                        <div>Contact: {company.email}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

const ListCompany = () => {
  const { data: companies } = k.company.all.useQuery();

  return (
    <div className="flex flex-wrap items-center justify-evenly gap-4">
      <Flashlist
        isloading={!companies}
        loading={
          <Loading>
            <Skeleton className="h-32 w-32 rounded-full" />
          </Loading>
        }
      >
        {companies?.data.map((company) => (
          <Link
            key={`company-${company.id}`}
            href={`/corps/${company.id}/task`}
          >
            <Avatar className="group relative h-32 w-32">
              <AvatarImage src={company.picture_link ?? ""} />
              <AvatarFallback>{shortName(company.company_name)}</AvatarFallback>
              <div className="absolute top-0 flex h-full w-full items-center justify-center bg-gray-900/60 text-xs opacity-0 transition-opacity group-hover:opacity-100">
                <div className="rounded-lg bg-gray-950 p-1 text-white">
                  {company.company_name}
                </div>
              </div>
            </Avatar>
          </Link>
        ))}
      </Flashlist>
    </div>
  );
};

export { CarouselCompany };

export default ListCompany;
