import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";

import Logo from "@hktekno/ui/components/logo";
import { ModeToggle } from "@hktekno/ui/components/theme-toggle";
import { Button } from "@hktekno/ui/components/ui/button";

export const metadata: Metadata = {
  title: "weekcan",
};

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden">
      <nav className="fade-bottom bg-background/5 fixed top-0 z-50 h-16 w-full backdrop-blur-lg">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                <Logo />
                <div className="text-md font-bold">weekcan</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
          </div>
        </div>
      </nav>
      <main className="max-h-lvh flex-1">
        <div
          className="flex grow flex-col gap-4"
          style={
            {
              "--brand": "214.3 31.8% 91.4%",
              "--brand-foreground": "198.4 93.2% 59.6%",
              "--radius": "2rem",
            } as CSSProperties
          }
        >
          <div className="flex w-full flex-col bg-background">
            <section className="fade-bottom bg-background px-4 py-12 pb-0 text-foreground sm:py-24 sm:pb-0 md:py-32 md:pb-0">
              <div className="mx-auto flex max-w-7xl flex-col gap-12 sm:gap-24">
                <div className="flex flex-col items-center gap-6 pt-16 text-center sm:gap-12">
                  <h1 className="animate-appear inline-block bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
                    Welcome to <span className="font-extrabold">weekcan</span>
                  </h1>
                  <p className="text-md max-w-[550px] font-medium text-muted-foreground sm:text-xl">
                    All you need for office management task, also included
                    attendance and inventory
                  </p>
                  <div className="animate-appear relative z-10 flex flex-col items-center justify-center gap-4 self-stretch delay-300">
                    <div className="flex w-full max-w-[420px] items-center justify-center gap-2">
                      <Button asChild variant={"primary"}>
                        <Link href="/login">Get Started</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="relative w-full pt-12">
                    <div className="relative w-full pt-[20%]">
                      <div className="bg-background/50 absolute -left-[50%] top-0 z-10 w-[200%] overflow-hidden rounded-[100%] border-4 border-white pt-[100%] shadow-[0px_0px_12px_hsla(var(--brand)/0.8),_0px_0px_64px_hsla(var(--brand-foreground)/0.5),0px_0px_12px_hsla(var(--brand)/0.8)_inset]">
                        <div
                          className="animate-pulse-hover bg-brand-foreground/50 absolute -left-[50%] top-0 h-[200%] w-[200%] rounded-[100%]"
                          style={{
                            maskImage: `radial-gradient(140% 95%, transparent 0%, transparent 35%, black 55%)`,
                          }}
                        ></div>
                        <div
                          className="animate-pulse-hover bg-brand/50 absolute -left-[50%] top-0 h-[200%] w-[200%] rounded-[100%]"
                          style={{
                            maskImage: `radial-gradient(140% 110%, transparent 0%, transparent 35%, black 55%)`,
                          }}
                        ></div>
                        <div
                          className="animate-pulse-hover absolute -left-[50%] -top-[5%] h-[200%] w-[200%] rounded-[100%] bg-white"
                          style={{
                            maskImage: `radial-gradient(140% 120%, transparent 0%, transparent 38%, black 43%)`,
                          }}
                        ></div>
                      </div>
                      <div className="absolute top-[50%] w-full">
                        <div className="absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 -translate-y-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(var(--brand-foreground)/.5)_10%,_hsla(var(--brand-foreground)/0)_60%)] sm:h-[512px]"></div>
                        <div className="absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 -translate-y-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(var(--brand)/.3)_10%,_hsla(var(--brand-foreground)/0)_60%)] sm:h-[256px]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
