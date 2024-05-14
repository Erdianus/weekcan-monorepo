"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleUserRound, LogOut } from "lucide-react";
import { toast } from "sonner";

import { k } from "@hktekno/api";
import { logoutAction } from "@hktekno/auth";
import Axios from "@hktekno/utils/axios";

import useAlertStore from "../lib/store/useAlertStore";
import useUserStore from "../lib/store/useUserStore";
import { shortName } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const UserMenu = () => {
  const user = useUserStore();
  const alert = useAlertStore();
  const router = useRouter();

  const { data: profile } = k.user.single.useQuery({
    variables: { id: `${user.id}` },
    enabled: !!Number(user.id),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={profile?.data.picture_link} />
          <AvatarFallback>{shortName(profile?.data.username)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{profile?.data.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem>
            <CircleUserRound className="mr-2 h-4 w-4" />
            <span>Profil</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            alert.setData({
              open: true,
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onAction: async () => {
                const res = await logoutAction();
                if (!res.status) {
                  toast.error(res.message);
                  return;
                }

                Axios.interceptors.request.clear();

                router.push("/login");
                toast.success(res.message);
                alert.reset();
              },
            });
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
