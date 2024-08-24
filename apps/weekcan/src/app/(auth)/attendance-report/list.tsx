"use client";

import type { EventSourceInput } from "@fullcalendar/core/index.js";
import { useMemo } from "react";
import idLocale from "@fullcalendar/core/locales/id";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";

import { k } from "@hktekno/api";

export default function ListReport() {
  const date = new Date();
  const { data } = k.attendance.report.useQuery({
    variables: { month: date.getMonth() + 1 },
  });

  const events = useMemo<EventSourceInput | undefined>(() => {
    if (!data) return undefined;

    return data.data.map((r) => {
      return {
        title: `${r.attendances[0]?.name} (${r.range})`,
        date: r.tanggal,
      };
    });
  }, [data]);

  return (
    <>
      <FullCalendar
        locale={idLocale}
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          right: "prev,next",
          left: "title",
          center: "dayGridWeek,dayGridDay,dayGridMonth,listWeek", // user can switch between the two
        }}
        events={events}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
      />
    </>
  );
}
