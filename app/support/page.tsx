// app/support/page.tsx
import { redirect } from 'next/navigation';

export default function SupportIndexPage() {
  redirect('/support/list');
}
