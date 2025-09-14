// app/business/page.tsx
import { redirect } from 'next/navigation';

export default function BusinessIndexPage() {
  redirect('/business/business_sector');
}
