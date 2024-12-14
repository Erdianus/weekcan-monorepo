"use client";

import dayjs from "dayjs";
import { Clock, MapPin } from "lucide-react";

import { k } from "@hktekno/api";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { H3 } from "@hktekno/ui/components/ui/typograhpy";

export default function Report({ user_id }: { user_id: string }) {
  const { data: user } = k.user.single.useQuery({ variables: { id: user_id } });
  const { data, isLoading } = k.attendance.report.useQuery({
    variables: { params: { user_id } },
  });

  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">Laporan Absen - {user?.data.name}</H3>
      </div>
      <div>
        {data?.data.map((report) => {
          return (
            <div>
              <h4 className="text-xl font-bold">
                {dayjs(report.tanggal).format("DD MMMM YYYY")}
              </h4>
              <p className="text-sm text-muted-foreground">
                Nilai: {report.range}
              </p>
              <div className="mt-4">
                {report.attendances.map((attendance) => {
                  return (
                    <div className="flex items-center border-b p-4">
                      <img
                        src={attendance.picture_link}
                        className="mr-4 h-8 w-8 rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <p className="line-clamp-1 text-sm font-bold">
                            {attendance.time.slice(0, 5)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <p className="line-clamp-1 text-sm font-bold">
                            {attendance.location_text}
                          </p>
                        </div>
                      </div>
                      <div>
                        <Badge variant={attendance.status}>
                          {attendance.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <h4></h4>
      </div>
    </>
  );
}
