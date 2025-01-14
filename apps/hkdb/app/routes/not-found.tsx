import {
    Link,
    MetaFunction,
    Outlet,
    useLoaderData,
    useLocation,
}from '@remix-run/react';
import {Image} from "@nextui-org/image";
import CatError from '~/assets/cat-error.png';
import { Undo2 } from 'lucide-react';
import NavbarData from "~/routes/db";

import { useEffect } from 'react';
import { ScrollShadow, Tab, Tabs } from '@nextui-org/react';
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import axios from 'axios';

import DataCat from '~/assets/cat-data.png';
import CopyToken from '~/components/ui/clipboard';
import { Axios } from '~/lib/axios';
import { commitSession, getSession } from '~/session';
import { useSessionStore } from '~/store/useSessionStore';

export const meta: MetaFunction = () => {
  return [{ title: 'Selamat Datang' }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('cookie'));

  if (!session.has('id')) return redirect('/login');

  try {
    await axios(`${process.env.BASE_API}/api/checkLogin`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.get('token')}`,
      },
    });

    return json(
      {
        session: session.data,
        env: {
          BASE_API: process.env.BASE_API,
        },
      },
      {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      },
    );
  } catch (_) {
    return redirect('/login');
  }
}

export default function Page(){
    return(
        <>
            <NavbarData includeOutlet={false}/>
            <div className='flex pt-14 h-screen min-w-full justify-center items-center'>
                <div className='flex-col justify-center'>
                    <Image
                        width={700}
                        alt="NextUI hero Image"
                        src={CatError}
                    />

                    <Link to="/db" className='flex justify-self-center w-fit gap-0.5 border-b-2 border-stone-950 dark:border-white pb-2 cursor-pointer'>
                        <Undo2 />
                        <span>Halaman Awal</span>
                    </Link>
                </div>
            </div>
        </>
    )
}