import React from 'react';
import AllGroups from "@/components/allGroups";
import { getUserByEmail } from "@/app/actions/db"
import { auth } from "@/auth";

export default async function Groups() {
  const session = await auth();

  const user = await getUserByEmail(session?.user?.email);
  const response = await fetch(process.env.APP_URL + "/api/groups/")
  const groups = await response.json();

  return (
    <div>
      <h1>Groups</h1>
      <AllGroups groups={JSON.parse(JSON.stringify(groups))} user={ JSON.parse(JSON.stringify(user)) } />
    </div>
  );
}
