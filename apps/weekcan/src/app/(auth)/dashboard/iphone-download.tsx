"use client";

import { Download, Smartphone } from "lucide-react";

import { Button } from "@hktekno/ui/components/ui/button";
import { getMobileOperatingSystem } from "@hktekno/ui/lib/utils";

export default function IphoneDownload() {
  if (getMobileOperatingSystem() !== "iOS") return undefined;

  return (
    <>
      <div className="my-3 rounded-lg border border-black bg-white p-4 dark:border-white dark:bg-black">
        <p className="text-xl font-bold">
          Aplikasi mobile untuk Iphone{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="inline"
          >
            <path
              fill="currentColor"
              d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
            ></path>
          </svg>{" "}
          ada disini!!!
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-semibold">1. Daftarkan dulu device mu</p>
            <a
              href="https://expo.dev/register-device/f860b539-2500-4561-8df8-6ef0e0230dae"
              target="_blank"
            >
              <Button className="bg-black text-white hover:opacity-90 dark:bg-white dark:text-black">
                Daftar <Smartphone />
              </Button>
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">2. Download Aplikasinya</p>
            <a
              href="https://expo.dev/artifacts/eas/umjbqzgmnTk6c1wWLYYCLU.ipa"
              target="_blank"
            >
              <Button className="bg-black text-white hover:opacity-90 dark:bg-white dark:text-black">
                Download <Download />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
