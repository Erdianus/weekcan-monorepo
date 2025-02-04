"use client";

import { useEffect, useState } from "react";
import { Home } from "lucide-react";

import { Button } from "@hktekno/ui/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt: () => Promise<void>;
}

export const A2HS = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstall, setIsInstall] = useState(true);

  async function listenUserAction() {
    setIsInstall(true);
    await deferredPrompt?.prompt();
    // Wait for the user to respond to the prompt
    await deferredPrompt?.userChoice.then(() => {
      setDeferredPrompt(null);
    });
  }

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Update UI to notify the user they can add to home screen
      setIsInstall(false);
    });
  }, []);

  if (isInstall) return null;

  return (
    <Button onClick={listenUserAction}>
      {" "}
      <Home />
      <span>Tambah Ke Home Screen</span>
    </Button>
  );
};
