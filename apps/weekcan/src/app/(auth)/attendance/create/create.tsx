"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useGeolocated } from "react-geolocated";
import Webcam from "react-webcam";
import { toast } from "sonner";

import { k } from "@hktekno/api";
import { Button } from "@hktekno/ui/components/ui/button";
import { Input } from "@hktekno/ui/components/ui/input";
import { Label } from "@hktekno/ui/components/ui/label";
import Spinner from "@hktekno/ui/components/ui/spinner";
import useUserStore from "@hktekno/ui/lib/store/useUserStore";

const CreateAttendance = () => {
  const [status, setStatus] = useState("In");
  const router = useRouter();
  const user_id = useUserStore((s) => `${s.id}`);

  const [ket, setKet] = useState("");
  const [dateState, setDateState] = useState(new Date());

  const locDivRef = useRef<HTMLDivElement>(null);
  const webcamRef = useRef<Webcam>(null);
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
        lat: number;
        lon: number;
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

  const create = k.attendance.create.useMutation({
    onSuccess: ({ message }) => {
      toast.success(message);
      router.push("/attendance");
    },
    onError: ({ message }) => {
      toast.error(message);
      setStatus((o) => (o === "In" ? "Out" : "In"));
    },
  });

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const date = new Date();
      const margin = 4;
      const rect = locDivRef.current?.getClientRects().item(0);
      const imgSrc = webcamRef.current?.getCanvas();

      const imgWidth = imgSrc?.width ?? 0;
      const imgHeight = imgSrc?.height ?? 0;
      const rectHeight = rect?.height ?? 0;

      const y = imgHeight - rectHeight - margin;

      if (imgSrc && data) {
        const ctx = imgSrc.getContext("2d");
        if (ctx) {
          // Container
          ctx.fillStyle = "#030712b3";
          ctx.beginPath();
          ctx.roundRect(margin, y, imgWidth - margin * 2, rectHeight, 8);
          ctx.fill();

          // Text
          ctx.fillStyle = "#fff";
          ctx.font = "700 14px Inter";
          ctx.fillText(
            `${data.address.country}, ${data.address.state}, ${data.address.city_district}`,
            margin * margin,
            y + margin + margin * margin,
          );

          ctx.font = "400 14px Inter";
          ctx.fillText(
            `${data.address.road}, ${data.address.city_district}, ${data.address.state}, ${data.address.postcode}, ${data.address.country}`,
            margin * margin,
            y + margin + margin * margin + margin * margin,
          );

          ctx.fillText(
            `Latitude: ${data.lat}`,
            margin * margin,
            y +
              margin +
              Math.pow(margin, 2) +
              Math.pow(margin, 2) +
              Math.pow(margin, 2),
          );

          ctx.fillText(
            `Longitude: ${data.lon}`,
            margin * margin,
            y +
              margin +
              Math.pow(margin, 2) +
              Math.pow(margin, 2) +
              Math.pow(margin, 2) +
              Math.pow(margin, 2),
          );

          ctx.fillText(
            dayjs().format("DD/MM/YY HH:mm:ss"),
            margin * margin,
            y +
              margin +
              Math.pow(margin, 2) +
              Math.pow(margin, 2) +
              Math.pow(margin, 2) +
              Math.pow(margin, 2) +
              Math.pow(margin, 2),
          );
        }

        create.mutate({
          data: {
            user_id,
            latitude: data.lat,
            longitude: data.lon,
            picture_path: imgSrc.toDataURL(),
            ket,
            status,
            date: dayjs(date).format("YYYY-MM-DD"),
            time: dayjs(date).format("HH:mm:ss"),
            location_text: data.display_name,
          },
        });
      }
    },
    [webcamRef, data, ket, status],
  );

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative">
          <Webcam
            ref={webcamRef}
            videoConstraints={{ facingMode: "selfie" }}
            mirrored
          />
          <div
            ref={locDivRef}
            className="absolute bottom-1 left-1 rounded bg-gray-950/70 p-2 text-xs text-white"
          >
            {data && (
              <>
                <p className=" font-bold">{`${data.address.country}, ${data.address.state}, ${data.address.city_district}`}</p>
                <p>
                  {`${data.address.road}, ${data.address.city_district}, ${data.address.state}, ${data.address.postcode}, ${data.address.country}`}{" "}
                </p>
                <p>Latitude: {data.lat}</p>
                <p>Longitude: {data.lon}</p>
                <p>{dayjs(dateState).format("DD/MM/YY HH:mm:ss")}</p>
              </>
            )}
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-1 flex-col justify-between gap-4"
        >
          <div className="">
            <Label>Keterangan</Label>
            <Input
              value={ket}
              placeholder="Masukkan Keterangan"
              className=""
              onChange={(e) => setKet(e.currentTarget.value ?? "")}
            />
          </div>
          <Button disabled={create.isPending} className="w-full">
            {create.isPending ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateAttendance;
