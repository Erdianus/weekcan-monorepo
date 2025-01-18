import { useEffect } from "react";
import { ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import {
  Link,
  MetaFunction,
  Outlet,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import axios from "axios";

import DataCat from "~/assets/cat-data.png";
import CopyToken from "~/components/ui/clipboard";
import { Axios } from "~/lib/axios";
import { commitSession, getSession } from "~/session";
import { useSessionStore } from "~/store/useSessionStore";

export const meta: MetaFunction = () => {
  return [{ title: "Selamat Datang" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));

  if (!session.has("id")) return redirect("/login");

  try {
    await axios(`${process.env.BASE_API}/api/checkLogin`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.get("token")}`,
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
          "Set-Cookie": await commitSession(session),
        },
      },
    );
  } catch (_) {
    return redirect("/login");
  }
}

interface props {
  includeOutlet: boolean;
}

export default function NavbarData({ includeOutlet = true }: props) {
  const data = useLoaderData<typeof loader>();
  const setSession = useSessionStore((s) => s.setData);
  const { pathname } = useLocation();

  useEffect(() => {
    Axios.interceptors.request.use((conf) => {
      conf.headers.Authorization = `Bearer ${data.session.token ?? ""}`;
      conf.baseURL = `${data.env.BASE_API}/api`;
      return conf;
    });
    setSession({
      id: data.session.id ?? 0,
      name: data.session.name ?? "",
      token: data.session.token ?? "",
      isDark: data.session.isDark ?? false,
    });
  }, [data.session.token, data.env.BASE_API]);

  return (
    <>
      <div className="bg-background antialiased">
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-background px-4 pt-2.5 dark:border-gray-700">
          <div className="mb-2 flex flex-wrap items-center justify-between">
            <div className="flex items-center justify-start">
              <a
                href="https://flowbite.com"
                className="mr-4 flex items-center justify-between"
              >
                <img src={DataCat} className="h-12" alt="a" />
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                  HK DataBase
                </span>
              </a>
            </div>
            <div className="flex items-center gap-4 lg:order-2">
              <CopyToken />
            </div>
          </div>
          <ScrollShadow orientation="horizontal">
            <Tabs
              selectedKey={pathname}
              aria-label="Pilihan Menu"
              variant="underlined"
              color="primary"
              classNames={{ tabList: "pb-0" }}
            >
              <Tab
                as={Link}
                key="/db"
                /*@ts-expect-error gapapa */
                to="/db"
                title="Overview"
                replace
                className="pb-0"
              />
              <Tab
                as={Link}
                key="/db/category-skill"
                //@ts-expect-error gapapa gan
                to="/db/category-skill"
                replace
                title="Kategori & Keahlian"
              />
              <Tab
                as={Link}
                key="/db/setting"
                //@ts-expect-error gapapa gan
                to="/db/setting"
                replace
                title="Pengaturan"
              />
            </Tabs>
          </ScrollShadow>
        </nav>
      </div>

      {includeOutlet ? (
        <div className={`container mx-auto h-auto pb-36 pt-40 lg:pt-32`}>
          <Outlet />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
