"use client";

import type { UrlObject } from "url";
import { useMemo } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import {
  Building2,
  Cake,
  CircleUserRound,
  Mail,
  MapPin,
  Pencil,
  Phone,
  User,
  UserRoundCog,
} from "lucide-react";

import { k } from "@hktekno/api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hktekno/ui/components/ui/avatar";
import { Badge } from "@hktekno/ui/components/ui/badge";
import { Button } from "@hktekno/ui/components/ui/button";
import { Skeleton } from "@hktekno/ui/components/ui/skeleton";
import Spinner from "@hktekno/ui/components/ui/spinner";
import { religionIcon } from "@hktekno/ui/icon";
import useUserStore from "@hktekno/ui/lib/store/useUserStore";
import { shortName } from "@hktekno/ui/lib/utils";

type Url = string | UrlObject;

export const DetailEmployee = ({
  user_id,
  edit_profile_link,
  edit_data_link,
}: {
  user_id: string | number;
  edit_profile_link?: Url;
  edit_data_link?: Url;
}) => {
  const curr_user_id = useUserStore((s) => s.id);
  const role = useUserStore((s) => s.role);
  const { data: user, isLoading } = k.user.single.useQuery({
    variables: { id: user_id },
  });

  const ReligionIcon = useMemo(() => {
    if (!user?.data.data_employee) return () => <></>;
    return religionIcon[user.data.data_employee.religion];
  }, [user?.data.data_employee]);

  return (
    <>
      <div className="mb-5 flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user?.data.picture_link ?? ""} />
          <AvatarFallback>{shortName(user?.data.name)}</AvatarFallback>
        </Avatar>
        {isLoading ? (
          <Skeleton className="h-4 w-40" />
        ) : (
          <p className="text-2xl font-bold">{user?.data.name}</p>
        )}
      </div>

      <div className="mb-6">
        <div className="mb-4 flex items-center gap-4 ">
          <h3 className="text-xl font-medium">Informasi Akun</h3>
          {edit_profile_link &&
            (["Admin", "Owner", "Manager", "HRD"].includes(role) ||
              `${user_id}` === `${curr_user_id}`) && (
              <Button asChild variant={"ghost"} size={"icon"}>
                <Link href={edit_profile_link}>
                  <Pencil size={16} />
                </Link>
              </Button>
            )}
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <User />
            {isLoading ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              <div className="">
                <div className="text-xs text-muted-foreground">Username</div>
                <div className="">{user?.data.username}</div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Mail />
            {isLoading ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              <div>
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="">{user?.data.email}</div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <UserRoundCog />
            {isLoading ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              <div>
                <div className="text-xs text-muted-foreground">Role</div>
                <div className="">{user?.data.role.role_name}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-4 text-xl font-medium">Informasi Perusahaan</h3>
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-id-card"
            >
              <path d="M16 10h2" />
              <path d="M16 14h2" />
              <path d="M6.17 15a3 3 0 0 1 5.66 0" />
              <circle cx="9" cy="11" r="2" />
              <rect x="2" y="5" width="20" height="14" rx="2" />
            </svg>

            {isLoading ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Jabatan</div>
                <div className="flex items-center gap-2">
                  {user?.data.job_types.map((jt) => {
                    return (
                      <Badge variant={"secondary"} key={`jtt-${jt.id}`}>
                        {jt.job_name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Building2 />
            {isLoading ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              <div>
                <div className="text-xs text-muted-foreground">
                  List Perusahaan
                </div>
                <div className="flex items-center gap-4">
                  {user?.data.company.map((c) => (
                    <Avatar
                      title={c.company_name}
                      className="h-6 w-6"
                      key={`com-${c.id}`}
                    >
                      <AvatarImage src={c.picture_link ?? ""} />
                      <AvatarFallback>
                        {shortName(c.company_name)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-4 flex items-center gap-4 ">
          <h3 className="text-xl font-medium">Informasi Pribadi</h3>
          {edit_data_link && (
            <Button asChild variant={"ghost"} size={"icon"}>
              <Link href={edit_data_link}>
                <Pencil size={16} />
              </Link>
            </Button>
          )}
        </div>

        {!user && <Spinner />}

        {user && !user?.data.data_employee && <div>Belum Ada Data</div>}

        {user && user.data.data_employee && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  color="currentColor"
                >
                  <path d="M8.5 18c1.813-1.954 5.167-2.046 7 0m-1.56-6c0 1.105-.871 2-1.947 2c-1.075 0-1.947-.895-1.947-2s.872-2 1.947-2s1.948.895 1.948 2"></path>
                  <path d="M9.5 4.002c-2.644.01-4.059.102-4.975.97C3.5 5.943 3.5 7.506 3.5 10.632v4.737c0 3.126 0 4.69 1.025 5.66c1.025.972 2.675.972 5.975.972h3c3.3 0 4.95 0 5.975-.971c1.025-.972 1.025-2.535 1.025-5.66v-4.738c0-3.126 0-4.689-1.025-5.66c-.916-.868-2.33-.96-4.975-.97"></path>
                  <path d="M9.772 3.632c.096-.415.144-.623.236-.792a1.64 1.64 0 0 1 1.083-.793C11.294 2 11.53 2 12 2s.706 0 .909.047a1.64 1.64 0 0 1 1.083.793c.092.17.14.377.236.792l.083.36c.17.735.255 1.103.127 1.386a1.03 1.03 0 0 1-.407.451C13.75 6 13.332 6 12.498 6h-.996c-.834 0-1.252 0-1.533-.17a1.03 1.03 0 0 1-.407-.452c-.128-.283-.043-.65.127-1.386z"></path>
                </g>
              </svg>{" "}
              {isLoading ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                <div className="">
                  <div className="text-xs text-muted-foreground">NIK</div>
                  <div className="">{user?.data.data_employee.nik}</div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <CircleUserRound />{" "}
              {isLoading ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                <div>
                  <div className="text-xs text-muted-foreground">
                    Nama Lengkap
                  </div>
                  <div className="">{user?.data.data_employee.full_name}</div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Cake />
              {isLoading ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                <div>
                  <div className="text-xs text-muted-foreground">
                    Tanggal Lahir
                  </div>
                  <div className="">
                    {dayjs(user?.data.data_employee.date_of_birth).format(
                      "DD MMMM YYYY",
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-venus-and-mars"
              >
                <path d="M10 20h4" />
                <path d="M12 16v6" />
                <path d="M17 2h4v4" />
                <path d="m21 2-5.46 5.46" />
                <circle cx="12" cy="11" r="5" />
              </svg>
              {isLoading ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                <div>
                  <div className="text-xs text-muted-foreground">Gender</div>
                  <div className="">
                    {user?.data.data_employee.gender === "L"
                      ? "Laki-laki"
                      : "Perempuan"}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <MapPin />
              {isLoading ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                <div>
                  <div className="text-xs text-muted-foreground">Alamat</div>
                  <div className="">{user?.data.data_employee.address}</div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Phone />
              {isLoading ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                <div>
                  <div className="text-xs text-muted-foreground">Telp/HP</div>
                  <div className="">{user?.data.data_employee.no_telp}</div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              {ReligionIcon ? (
                <ReligionIcon />
              ) : (
                <Skeleton className="h-4 w-4 rounded-full" />
              )}
              {isLoading ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                <div>
                  <div className="text-xs text-muted-foreground">Agama</div>
                  <div className="">{user?.data?.data_employee.religion}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
