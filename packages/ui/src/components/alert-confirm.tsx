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

const AlertConfirm = () => {
  const alert = useAlertStore();
  return (
    <AlertDialog open={alert.open} onOpenChange={alert.setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alert.header}</AlertDialogTitle>
          <AlertDialogDescription>{alert.desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{alert.cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={alert.onConfirm}>
            {alert.confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertConfirm;
