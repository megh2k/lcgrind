import React from "react";
import { getUserByEmail, getGroupInfo } from "@/app/actions/db";
import { auth } from "@/auth";

export default async function GroupDetails({ params }) {
  const groupId = params?.id;

  const session = await auth();

  const loggedUser = await getUserByEmail(session?.user?.email);

  const group = await getGroupInfo(groupId);

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="w-64 bg-gray-800 text-white p-4 flex flex-col justify-start items-center rounded-lg h-full">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <ul className="overflow-y-auto flex-1 w-full">
          {group.users.map((user) => (
            <li
              key={user._id}
              className="text-gray-300 py-2 hover:text-blue-500 text-center"
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{group.name}</h1>
        <p className="text-gray-600 mb-6">{group.description}</p>

        <h2 className="text-2xl font-semibold text-gray-800">Main Content</h2>
        {/* Your other content here */}
      </div>
    </div>
  );
}
