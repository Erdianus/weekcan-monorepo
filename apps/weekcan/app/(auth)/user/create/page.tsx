import CreateUser from "@repo/ui/pages/user/create";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Buat User'
}

export default function CreateUserPage() {
  return (
    <>
      <CreateUser />
    </>
  );
}
