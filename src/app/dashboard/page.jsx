// src/app/dashboard/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/app/actions/db";
import  Dashboard  from '@/components/dashboard';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const user = await getUserByEmail(session?.user?.email);
  return <Dashboard userExists={user? true : false} email={ session?.user?.email} />;
}
