import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import Group from "@/models/Group";
import { NextResponse } from 'next/server';


export async function getUserByEmail(email) {
  await connectToDB();
  const user = await User.findOne({ email });
  return user;
}

export async function getGroupInfo(groupId) {
  await connectToDB();
  const group = await Group.findById(groupId).populate('users', 'username').populate('creator', 'username');
  return group;
}

export async function getAllGroupUsers(groupId) {
  await connectToDB();
  const group = await Group.findById(groupId).populate('users', 'username');

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
  const variables = { "username": username };

  const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/leetcode/", {
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