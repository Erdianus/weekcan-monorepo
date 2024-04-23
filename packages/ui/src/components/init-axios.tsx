"use client"
import { useEffect, Fragment } from "react";
import Axios from "@repo/utils/axios";

const InitAxios = ({token}: {token: string}) => {
  useEffect(() => {
    Axios.interceptors.request.use(
      (conf) => {
        conf.headers.Authorization = `Bearer ${token}`;
        return conf;
      },
      (err) => err,
    );
  }, []);
  return <Fragment />;
};

export default InitAxios;
