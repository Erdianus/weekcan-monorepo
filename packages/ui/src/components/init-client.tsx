'use client';

import { Fragment, useEffect } from 'react';
import useUserStore from '@ui/lib/store/useUserStore';

import { UserSession } from '@repo/auth';
import Axios from '@repo/utils/axios';

import 'dayjs/locale/id';

import dayjs from 'dayjs';

dayjs.locale('id');

function InitClient({ user }: { user: UserSession }) {
  console.log('aku dari init client');
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
