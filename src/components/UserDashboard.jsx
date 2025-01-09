import { languageStats } from "@/constants/leetcode";
import User from "@/models/User";

export default async function UserDashboard({ username }) {
  const userObject = await User.findOne({"username": username});
  console.log("userobject", userObject);
  const languageStatsData = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: languageStats,
      variables: { username },
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });

  const userLanguageStatsData = await languageStatsData.data.matchedUser.languageProblemCount;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Welcome to your dashboard, {username}!
      </h1>

      <h3 className="text-3xl font-semibold text-gray-800 mb-6">
        Problems Solved
      </h3>
      <div className="space-y-4">
        {userLanguageStatsData.map((lang, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-md shadow-sm">
            <p className="text-lg text-gray-700">
              <span className="font-semibold">{lang.languageName}:</span>{" "}
              {lang.problemsSolved}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
