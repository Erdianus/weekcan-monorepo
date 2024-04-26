import dayjs from "dayjs";

const dateRange = (start_date: string, end_date?: string | null) => {
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

export {
  dateRange
}
