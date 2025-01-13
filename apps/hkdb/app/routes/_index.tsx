import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { Button } from "@hktekno/ui/components/ui/button";

import CatLogo from "~/assets/cat-data.png";

export const meta: MetaFunction = () => {
  return [
    { title: "HK DB" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <section className="">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
              HK Database
            </h1>
            <p className="mb-6 max-w-2xl font-light md:text-lg lg:mb-8 lg:text-xl">
              Cari aja semuanya disini ada kok
            </p>
            <Button asChild>
              <Link to={"/login"}>Get Started</Link>
            </Button>
          </div>
          <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
            <img className="w-2/3" src={CatLogo} alt="mockup" />
          </div>
        </div>
      </section>
    </div>
  );
}
