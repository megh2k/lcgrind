import { auth } from "@/auth";
import { getUserByEmail } from "@/app/actions/db";
import UsernamePrompt from "@/components/UsernamePrompt";
import UserDashboard from "@/components/UserDashboard";
import { redirect } from "next/navigation";
import { languageStats } from "@/constants/leetcode";

export default async function Dashboard() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);
  const username = user?.username;
  const languageStatsData = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: languageStats,
      variables: { username: username },
    }),
  }).then((response) => {
    if (!response.ok) {
      console.log("not ok");
    }
    return response.json();
  });

  if (!user && !session) {
    redirect("signin/");
  }

  const userLanguageStatsData = await languageStatsData?.data?.matchedUser
    ?.languageProblemCount;
  
  return (
    <div>
      {session && user ? (
        <UserDashboard
          userLanguageStatsData={userLanguageStatsData}
          user={JSON.parse(JSON.stringify(user))}
        />
      ) : (
        <UsernamePrompt session={session} />
      )}
    </div>
  );
}
