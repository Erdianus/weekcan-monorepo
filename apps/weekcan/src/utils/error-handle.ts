import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const errHandle = (error: Error) => {
  toast.error(error.message);
  const router = useRouter();
  if (error instanceof AxiosError) {
    if (error.status === 401) {
      router.replace("/logout");
    }
  }
};
