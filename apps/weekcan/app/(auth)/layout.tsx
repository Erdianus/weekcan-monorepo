import { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';
import axios from 'axios';

import QueryProvider from '@repo/api/provider';
import { auth } from '@repo/auth';
import AlertConfirm from '@repo/ui/components/alert-confirm';
import InitAxios from '@repo/ui/components/init-axios';
import Navbar from '@repo/ui/components/navbar';
import Sidebar from '@repo/ui/components/sidebar';

export default async function AuthLayout({ children }: PropsWithChildren) {
  const sesh = await auth();

  if (!sesh) {
    redirect('/login');
  }

  try {
    const res = await axios(`${process.env.BASE_API}/api/checkLogin`, {
      headers: {
        Authorization: `Bearer ${sesh.user.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (res.status !== 200) {
      await axios.post('/api/auth/signout');
      redirect('/login');
    }
  } catch (e) {
    await axios.post('/api/auth/signout');
    redirect('/login');
  }

  return (
    <>
      <InitAxios user={sesh.user} />
      <QueryProvider>
        <AlertConfirm />
        <div className="antialiased">
          <Navbar />
          {/* <!-- Sidebar --> */}
          <Sidebar />
          <main className="min-h-svh p-4 pt-20 md:ml-64">{children}</main>
        </div>
      </QueryProvider>
    </>
  );
}
