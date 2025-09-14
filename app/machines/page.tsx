// app/machines/page.tsx
import { redirect } from 'next/navigation';

export default function MachinesIndexPage() {
  redirect('/machines/lasercutting');
}
