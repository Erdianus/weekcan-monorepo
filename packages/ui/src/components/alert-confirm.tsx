"use client";

import useAlertStore from "../lib/store/useAlertStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import ButtonSubmit from "./ui/button-submit";

const AlertConfirm = () => {
  const alert = useAlertStore();
  if (!alert.open) return null;
  return (
    <AlertDialog
      open={alert.open}
      onOpenChange={() => {
        alert.reset();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alert.header}</AlertDialogTitle>
          <AlertDialogDescription>{alert.desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{alert.cancelText}</AlertDialogCancel>
          {alert.onAction ? (
            <form action={alert.onAction}>
              <ButtonSubmit>Ya, Logout</ButtonSubmit>
            </form>
          ) : (
            <AlertDialogAction onClick={alert.onConfirm}>
              {alert.confirmText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertConfirm;
