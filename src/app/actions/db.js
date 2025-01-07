import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import Group from "@/models/Group";
import { NextResponse } from "next/server";
import { recentACSubmissions, startDate } from "@/constants/leetcode";

export async function getUserByEmail(email) {
  await connectToDB();
  const user = await User.findOne({ email });
  return user;
}

export async function getGroupInfo(groupId) {
  await connectToDB();
  const group = await Group.findById(groupId)
    .populate("users", "username")
    .populate("creator", "username");
  return group;
}

export async function getAllGroupUsers(groupId) {
  await connectToDB();
  const group = await Group.findById(groupId).populate("users", "username");
}

export async function languageStats(username) {
  const query = `query languageStats($username: String!) {
            matchedUser(username: $username) {
              languageProblemCount {
                languageName
                problemsSolved
              }
            }
          }`;
  const variables = { username: username };

  const response = await fetch(
    process.env.NEXT_PUBLIC_APP_URL + "/api/leetcode/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  const result = await response.json();
  return NextResponse.json(result);
}

export async function leetcodeStats(query, variables) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_APP_URL + "/api/leetcode/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );
  return response.json();
}

export async function getGroupHeatMapValues(userNames) {
  const hashMap = {};

  for (let i = 0; i < userNames.length; i++) {

    const userName = userNames[i].username;
    const query = recentACSubmissions;
    const variables = { "username": userName, "limit": "10" };
    const result = await leetcodeStats(query, variables);
    const userRecentACSubmissions = result.data.recentAcSubmissionList;

    for (let j = 0; j < userRecentACSubmissions.length; j++){
      const timestamp = parseInt(userRecentACSubmissions[j].timestamp);
      const submitDate = new Date(timestamp * 1000);
      const dateNoTime = (submitDate.toISOString()).split('T')[0];

      if (startDate > dateNoTime) {
        hashMap[dateNoTime] = (hashMap[dateNoTime] || 0) + 1;
      }

    }

  }
  const resultArray = Object.entries(hashMap).map(([date, count]) => ({ date, count }));
  return resultArray;

}