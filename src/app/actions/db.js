import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import Group from "@/models/Group";
import { NextResponse } from "next/server";
import {
  userProfileCalendar,
  recentAcSubmissions,
  todayDate,
} from "@/constants/leetcode";

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

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/leetcode/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  return NextResponse.json(result);
}

export async function leetcodeStats(query, variables) {
  console.log("inside leetcodestats");
  console.log(process.env.NEXTAUTH_URL);
  console.log(query);
  console.log(variables);
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/leetcode/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  console.log("leetcodeStats", result);
  return result;
}

export async function getGroupHeatMapValues(userNames) {
  const hashMap = {};

  for (let i = 0; i < userNames.length; i++) {
    const userName = userNames[i].username;
    const query = userProfileCalendar;
    const variables = { username: userName };
    const result = await leetcodeStats(query, variables);
    const calendar = result.data.matchedUser.userCalendar.submissionCalendar; //string
    const parsedCalendar = JSON.parse(calendar);
    const submissionCalendar = Object.entries(parsedCalendar);

    for (let j = 0; j < submissionCalendar.length; j++) {
      const timestamp = parseInt(submissionCalendar[j][0]);
      const submitDate = new Date(timestamp * 1000);
      const dateNoTime = submitDate.toISOString().split("T")[0];

      hashMap[dateNoTime] =
        (hashMap[dateNoTime] || 0) + parseInt(submissionCalendar[j][1]);
    }
  }
  const resultArray = Object.entries(hashMap).map(([date, count]) => ({
    date,
    count,
  }));
  return resultArray;
}

export async function getGroupRecentAcSubmissions(userNames) {
  const hashMap = {};

  for (let i = 0; i < userNames.length; i++) {
    const userName = userNames[i].username;
    const query = recentAcSubmissions;
    const variables = { username: userName, limit: 5 };

    const result = await leetcodeStats(query, variables);
    const acSubmissions = result.data.recentAcSubmissionList;

    for (let j = 0; j < acSubmissions.length; j++) {
      const timestamp = parseInt(acSubmissions[j].timestamp);
      const submitDate = new Date(timestamp * 1000);
      const dateNoTime = submitDate.toISOString().split("T")[0];
      const title = acSubmissions[j].title;
      if (todayDate === dateNoTime) {
        hashMap[userName] = hashMap[userName] || [];
        hashMap[userName].push(title);
      }
    }
  }
  return hashMap;
}
