import { auth } from "@/auth"
import { getUserByEmail } from "@/app/actions/db"
import UsernamePrompt from "@/components/usernamePrompt";
import UserDashboard from "@/components/userDashboard";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  console.log(session);

  const user = await getUserByEmail(session?.user?.email);

  if (!user && !session) {
    redirect("signin/")
  }

  return (
    <div>
      {session && user?
        <UserDashboard username={user?.username} /> :
        <UsernamePrompt session={ session } />
      }

    </div>
  )
}