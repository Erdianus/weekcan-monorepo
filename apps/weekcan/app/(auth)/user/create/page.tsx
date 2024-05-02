import { Metadata } from 'next';

import CreateUser from './create';

export const metadata: Metadata = {
  title: 'Buat User',
};

export default function CreateUserPage() {
  return (
    <>
      <CreateUser />
    </>
  );
}
