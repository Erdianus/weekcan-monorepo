// Lightbox CSS
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
// react image crop
import "react-image-crop/dist/ReactCrop.css";
import "~/app/globals.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import QueryProvider from "@hktekno/ui/components/providers";
import { ThemeProvider } from "@hktekno/ui/components/theme-provider";
import { Toaster } from "@hktekno/ui/components/ui/sonner";
import { TooltipProvider } from "@hktekno/ui/components/ui/tooltip";
import { cn } from "@hktekno/ui/lib/utils";

import { env } from "~/env";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: {
    default: "weekcan",
    template: "%s - weekcan",
  },
  description: "weekcan, i can, u can",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "weekcan",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "weekcan",
    title: {
      default: "weekcan",
      template: "%s - weekcan",
    },
    description: "weekcan keren",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={cn("", inter.className)}>
        <ThemeProvider disableTransitionOnChange attribute="class">
          <QueryProvider>
            <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
        <Toaster richColors closeButton position="top-right" />
      </body>
    </html>
  );
}
