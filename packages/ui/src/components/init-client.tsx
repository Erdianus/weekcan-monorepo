"use client";

import { Fragment, useEffect } from "react";

import "dayjs/locale/id";

import dayjs from "dayjs";

import Axios from "@hktekno/utils/axios";

import useUserStore from "../lib/store/useUserStore";

dayjs.locale("id");

function InitClient({ user }: { user: { id: string; token: string } }) {
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
  }, []);
  return <Fragment />;
}

export default InitClient;
