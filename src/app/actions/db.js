import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import Group from "@/models/Group";
import {
  userProfileCalendar,
  recentAcSubmissions,
  todayDate,
  questionDifficulty,
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
      const dateNoTime = submitDate
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "/");
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
export async function getGroupHeatMapValuesParallel(userNames) {
  // Create an array of promises for parallel execution
  const fetchPromises = userNames.map(({ username }) => {
    return fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: userProfileCalendar,
        variables: { username },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        // Return both username and calendar data for processing
        return {
          username,
          calendar: JSON.parse(
            result.data.matchedUser.userCalendar.submissionCalendar
          ),
        };
      });
  });

  // Execute all fetch requests in parallel
  const usersData = await Promise.all(fetchPromises);

  // Process the results
  const hashMap = {};

  usersData.forEach(({ username, calendar }) => {
    Object.entries(calendar).forEach(([timestamp, count]) => {
      const submitDate = new Date(parseInt(timestamp) * 1000)
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "/");

      if (!hashMap[submitDate]) {
        hashMap[submitDate] = {};
      }
      if (!hashMap[submitDate][username]) {
        hashMap[submitDate][username] = 0;
      }
      hashMap[submitDate][username] += count;
    });
  });

  // Convert hashMap to resultArray (same format as original)
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

    const result = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: recentAcSubmissions,
        variables: { username: userName, limit: 10 },
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
      const titleSlug = acSubmissions[j].titleSlug;
      if (todayDate === dateNoTime) {
        // get difficulty and link
        const result = await fetch("https://leetcode.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: questionDifficulty,
            variables: { titleSlug: titleSlug },
          }),
        }).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        });
        const difficulty = result.data.question.difficulty;
        const link = `https://leetcode.com/problems/${titleSlug}`;

        hashMap[userName] = hashMap[userName] || [];
        hashMap[userName].push({
          title: title,
          difficulty: difficulty,
          link: link,
        });
      } else {
        break;
      }
    }
  }
  return hashMap;
}

export async function getGroupRecentAcSubmissionsParallel(userNames) {
  const promises = userNames.map(async (userName) => {
    const result = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: recentAcSubmissions,
        variables: { username: userName.username, limit: 10 },
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });

    const acSubmissions = result.data.recentAcSubmissionList;
    const hashMap = {};

    for (const acSubmission of acSubmissions) {
      const timestamp = parseInt(acSubmission.timestamp);
      const submitDate = new Date(timestamp * 1000);
      const dateNoTime = submitDate.toISOString().split("T")[0];
      const title = acSubmission.title;
      const titleSlug = acSubmission.titleSlug;

      if (todayDate === dateNoTime) {
        const result = await fetch("https://leetcode.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: questionDifficulty,
            variables: { titleSlug: titleSlug },
          }),
        }).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        });

        const difficulty = result.data.question.difficulty;
        const link = `https://leetcode.com/problems/${titleSlug}`;

        hashMap[userName.username] = hashMap[userName.username] || [];
        hashMap[userName.username].push({
          title: title,
          difficulty: difficulty,
          link: link,
        });
      }
    }

    return hashMap;
  });

  return Promise.all(promises).then((results) => {
    const mergedResults = results.reduce(
      (acc, result) => ({ ...acc, ...result }),
      {}
    );
    return mergedResults;
  });
}
