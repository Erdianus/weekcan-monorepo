"use client";

import dayjs from "dayjs";

import { k } from "@hktekno/api";
import Flashlist from "@hktekno/ui/components/flashlist";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";
import { cn } from "@hktekno/ui/lib/utils";

export default function Report({ user_id }: { user_id: string }) {
  const { data: user, isLoading } = k.user.single.useQuery({
    variables: { id: user_id },
  });
  const { data } = k.attendance.report.useQuery({
    variables: { params: { user_id } },
  });

  const isload = !user && isLoading;

  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <H3 className="">Laporan Absen</H3>{" "}
          {isload ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <H3>{`- ${user?.data.name}`}</H3>
          )}
        </div>
      </div>
      <div>
        <Flashlist
          isloading={isload}
          loading={
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          }
          isfallback={data?.data?.length === 0}
          fallback={
            <div className="flex items-center justify-center">
              Belum Ada Data Absen
            </div>
          }
        >
          {data?.data.map((report) => {
            return (
              <div key={`report-${report.tanggal}`} className="mb-8">
                <h4 className="text-xl font-bold">
                  {dayjs(report.tanggal).format("DD MMMM YYYY")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Nilai: {report.range / 8}
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {report.attendances.map((attendance) => {
                    return (
                      <div
                        key={`attend-${attendance.id}`}
                        className="relative max-h-80 max-w-80"
                      >
                        <img
                          src={attendance.picture_link}
                          className="h-full w-full rounded-lg object-cover"
                        />
                        <div className="absolute bottom-0 mx-1 mb-1 rounded bg-black/40 p-2 text-xs">
                          <p className="text-sm font-bold">{attendance.name}</p>
                          <p>
                            {" "}
                            <span
                              className={cn(
                                attendance.status === "In"
                                  ? "text-green-500"
                                  : "text-orange-500",
                              )}
                            >
                              {attendance.status}
                            </span>
                            {", "}
                            {attendance.time}
                            {", "}
                            {dayjs(attendance.date).format("DD MMMM YYYY")}
                          </p>
                          <p>{attendance.location_text}</p>
                          <p>
                            {attendance.latitude}, {attendance.longitude}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Flashlist>
      </div>
    </>
  );
}
