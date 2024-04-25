import CreateCompany from '@repo/ui/pages/company/create';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Buat Perusahaan'
}
export default function CreateCompanyPage() {
  return <>
    <CreateCompany />
  </>
}
