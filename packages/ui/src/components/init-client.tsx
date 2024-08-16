"use client";

import { Fragment, useEffect } from "react";

import "dayjs/locale/id";

import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

import Axios from "@hktekno/utils/axios";

import useUserStore from "../lib/store/useUserStore";

dayjs.locale("id");
dayjs.extend(updateLocale);

dayjs.updateLocale("id", {
  relativeTime: {
    future: "Sisa %s lagi",
    past: "Selesai %s lalu",
    s: "beberapa detik",
    m: "beberapa menit",
    mm: "%d menit",
    h: "sejam",
    hh: "%d jam ",
    d: "sehari ",
    dd: "%d hari ",
    M: "sebulan",
    MM: "%d bulan",
    y: "setahun",
    yy: "%d tahun",
  },
});

function InitClient({
  user,
}: {
  user: {
    id: string;
    role: string;
    role_id: string;
    token: string;
    friends_id?: number;
  };
}) {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.setData(user);
    Axios.interceptors.request.use(
      (conf) => {
        conf.headers.Authorization = `Bearer ${user.token}`;
        return conf;
      },
      (err) => err,
    );
  }, [user]);
  return <Fragment />;
}

export default InitClient;
