import { auth } from "@/auth"
import { getUserByEmail } from "@/app/actions/db"
import UsernamePrompt from "@/components/usernamePrompt";
import UserDashboard from "@/components/userDashboard";

export default async function Dashboard() {
  const session = await auth();

  const user = await getUserByEmail(session?.user?.email);
  const username = user?.username;

  return (
    <div>
      {username ? 
        <UserDashboard username={ username} /> :
        <UsernamePrompt session={ session } />
      }

    </div>
  )
}