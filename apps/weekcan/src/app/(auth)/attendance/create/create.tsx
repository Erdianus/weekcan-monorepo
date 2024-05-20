"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import { useGeolocated } from "react-geolocated";
import Webcam from "react-webcam";

import { Button } from "@hktekno/ui/components/ui/button";
import { Label } from "@hktekno/ui/components/ui/label";
import { Textarea } from "@hktekno/ui/components/ui/textarea";

const LiveTime = () => {
  const [mount, setMount] = useState(false);
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);

  return (
    <>
      {mount
        ? createPortal(
            <p>
              {dateState.toLocaleString("id-ID", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
              })}
              {`, `}
              {dateState.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>,
            // @ts-expect-error gapapa bro error
            document.querySelector("#portal-search"),
          )
        : null}
    </>
  );
};

const CreateAttendance = () => {
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const { data } = useQuery({
    queryKey: ["nominatim"],
    queryFn: async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords?.latitude}&lon=${coords?.longitude}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      const json = (await res.json()) as {
        lat: string;
        lon: string;
        name: string;
        display_name: string;
        address: {
          leisure: string;
          road: string;
          village: string;
          city_district: string;
          city: string;
          state: string;
          region: string;
          postcode: string;
          country: string;
        };
      };

      return json;
    },
    enabled: !!coords,
  });

  console.log(data);

  return (
    <>
      {/* <SelectDevices devices={devices} /> */}
      <LiveTime />
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative">
          <Webcam />
          <div className="absolute bottom-1 left-1 w-full rounded bg-gray-950/70 p-1">
            <p className="text-xs font-bold">{`${data?.address.country}, ${data?.address.state}, ${data?.address.city_district}`}</p>
            <p className="text-xs">{`${data?.address.road},`} </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <Label>Keterangan</Label>
            <Textarea placeholder="Masukkan Keterangan" className="" />
          </div>

          <Button className="w-full">Submit</Button>
        </div>
      </div>
    </>
  );
};

export default CreateAttendance;
