import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import Group from "@/models/Group";
import {
  userProfileCalendar,
  recentAcSubmissions,
  todayDate,
} from "@/constants/leetcode";

export async function getUserByEmail(email) {
  await connectToDB();
  const user = await User.findOne({ email })
    .populate("requests.userId", "username")
    .populate("requests.groupId", "name");
  return user;
}

export async function getGroupInfo(groupId) {
  await connectToDB();
  const group = await Group.findById(groupId)
    .populate("users", "username")
    .populate("creator", "username");
  return group;
}

export async function getGroupHeatMapValues(userNames) {
  const hashMap = {};

  for (let i = 0; i < userNames.length; i++) {
    const userName = userNames[i].username;
    const query = userProfileCalendar;
    const variables = { username: userName };

    const result = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });

    const calendar = result.data.matchedUser.userCalendar.submissionCalendar; //string
    const parsedCalendar = JSON.parse(calendar);
    const submissionCalendar = Object.entries(parsedCalendar);

    for (let j = 0; j < submissionCalendar.length; j++) {
      const timestamp = parseInt(submissionCalendar[j][0]);
      const count = submissionCalendar[j][1];
      const submitDate = new Date(timestamp * 1000);
      const dateNoTime = submitDate.toISOString().split("T")[0].replace(/-/g, '/');;
      console.log(dateNoTime)
      if (!hashMap[dateNoTime]) {
        hashMap[dateNoTime] = {};
      }

      if (!hashMap[dateNoTime][userName]) {
        hashMap[dateNoTime][userName] = 0;
      }

      hashMap[dateNoTime][userName] += count;
    }
  }
  const resultArray = Object.entries(hashMap).map(([date, userCountMap]) => {
    const activeUsers = userCountMap;
    const totalCount = Object.values(activeUsers).reduce(
      (sum, count) => sum + count,
      0
    );
    return {
      date,
      count: totalCount,
      activeUsers,
    };
  });
  return resultArray;
}

export async function getGroupRecentAcSubmissions(userNames) {
  const hashMap = {};

  for (let i = 0; i < userNames.length; i++) {
    const userName = userNames[i].username;
    const query = recentAcSubmissions;
    const variables = { username: userName, limit: 10 };

    const result = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
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
