"use client"
import { useEffect, Fragment } from "react";
import Axios from "@repo/utils/axios";
import useUserStore from "@ui/lib/store/useUserStore";
import { UserSession } from "@repo/auth";

const InitAxios = ({user}: {user: UserSession}) => {
  const userStore = useUserStore()

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
};

export default InitAxios;
