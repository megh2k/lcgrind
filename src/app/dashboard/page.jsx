import { auth } from "@/auth";
import {
  getUserByEmail,
  getGroupHeatMapValuesParallel,
} from "@/app/actions/db";
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
  const userSubmissions = await getGroupHeatMapValuesParallel([user]);

  // Function to process userSubmissions for 2025 only
  function processSubmissions(submissions) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const counts = Array(12).fill(null);

    submissions.forEach((submission) => {
      const [year, month] = submission.date.split("/");
      if (year === "2025") {
        const monthIndex = parseInt(month, 10) - 1;
        counts[monthIndex] += submission.count;
      }
    });

    return { months, counts };
  }
  const userYearSubmissions = processSubmissions(userSubmissions);
  return (
    <div>
      {session && user ? (
        <UserDashboard
          userLanguageStatsData={userLanguageStatsData}
          userYearSubmissions={userYearSubmissions}
          user={JSON.parse(JSON.stringify(user))}
        />
      ) : (
        <UsernamePrompt session={session} />
      )}
    </div>
  );
}
