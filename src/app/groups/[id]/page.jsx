import React from "react";
import { getUserByEmail, getGroupInfo, getGroupHeatMapValues } from "@/app/actions/db";
import { auth } from "@/auth";
import HeatMapComponent from "@/components/heatMap";


export default async function GroupDetails({ params }) {
  const groupId = (await params)?.id;
  const session = await auth();
  const loggedUser = await getUserByEmail(session?.user?.email);
  const group = await getGroupInfo(groupId);
  const userNames = group?.users;
  const values = await getGroupHeatMapValues(userNames);
  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="w-64 bg-gray-200 text-gray-800 p-4 flex flex-col justify-start items-center rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Members</h2>
        <ul className="w-full">
          {group.users.map((user) => (
            <li
              key={user._id}
              className="text-gray-600 py-2 hover:text-blue-500 text-center"
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="p-6 flex-1 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{group.name}</h1>
        <p className="text-gray-600 mb-6 text-center">{group.description}</p>

        <h2 className="text-2xl font-semibold text-gray-800 text-center">Activity</h2>
        <HeatMapComponent values={ values } />
      </div>
    </div>
  );
}
