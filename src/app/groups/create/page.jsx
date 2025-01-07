import React from 'react'
import CreateGroup from '@/components/CreateGroup';
import { getUserByEmail } from "@/app/actions/db"
import { auth } from "@/auth";

export default async function AddGroup() {
  const session = await auth();

  const user = await getUserByEmail(session?.user?.email);

  return (
    <div>
      <CreateGroup user={JSON.parse(JSON.stringify(user))} />
    </div>

  )
}
