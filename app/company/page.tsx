// app/company/page.tsx
import { redirect } from 'next/navigation';

export default function CompanyIndexPage() {
  redirect('/company/greeting');
}
