import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const dateRange = (
  start_date?: string | Date,
  end_date?: Date | string | null,
) => {
  if (!start_date) return dayjs().format("DD MMM YYYY");

  if (!end_date) return dayjs(start_date).format("DD MMM YYYY");

  const same_day = dayjs(start_date).isSame(dayjs(end_date), "day");

  if (same_day) return dayjs(start_date).format("DD MMM YYYY");

  const same_month = dayjs(start_date).isSame(dayjs(end_date), "month");

  if (same_month)
    return `${dayjs(start_date).format("DD")} - ${dayjs(end_date).format("DD MMM YYYY")}`;

  const same_year = dayjs(start_date).isSame(dayjs(end_date), "year");

  if (same_year)
    return `${dayjs(start_date).format("DD MMM")} - ${dayjs(end_date).format("DD MMM YYYY")}`;

  return `${dayjs(start_date).format("DD MMM YYYY")} - ${dayjs(end_date).format("DD MMM YYYY")}`;
};

const date4Y2M2D = (date?: string | Date | null) => {
  return dayjs(date).format("YYYY-MM-DD");
};

const relativeDate = (date?: string | Date, dateEnd?: string | Date) => {
  if (!dateEnd) {
    return dayjs(date).fromNow();
  }

  const beforeTheDate = dayjs().isBefore(dayjs(date), "day");
  // const isBetween = dayjs().isSame(date, 'day') || dayjs().isBetween(date, dateEnd, 'day') || dayjs().isSame(dateEnd);
  // const afterTheDate = dayjs().isBefore(dayjs(date), 'day');

  if (beforeTheDate) {
    return `Mulai ${dayjs(date).fromNow(true)} lagi`;
  }

  return dayjs(dateEnd).fromNow();
};

export { dayjs, dateRange, date4Y2M2D, relativeDate };
