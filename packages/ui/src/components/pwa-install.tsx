"use client";

import { useEffect, useState } from "react";

import { cn } from "../lib/utils";
import { AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt: () => Promise<void>;
}

const PWAConfirmInstall = () => {
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

  return (
    <div
      className={cn(
        "fixed bottom-2 right-2 z-20 w-max rounded-lg border border-border p-3 transition-all",
        isInstall && "-bottom-32",
      )}
    >
      <AlertTitle>Install aplikasi?</AlertTitle>
      <div className="mt-2 flex items-center justify-end gap-2">
        <Button
          onClick={() => setIsInstall(true)}
          type="button"
          variant={"outline"}
        >
          Cancel
        </Button>
        <Button onClick={listenUserAction} type="button">
          Ya, Install
        </Button>
      </div>
    </div>
  );
};

export { PWAConfirmInstall };
