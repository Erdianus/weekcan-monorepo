import CreateProject from '@repo/ui/pages/project/create';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buat Proyek Baru'
}
export default function CreateProjectPage() {
  return <>
    <CreateProject />
  </>
}

