// GroupDetails.js
import React from "react";
import { getUserByEmail, getGroupInfo, getGroupHeatMapValues } from "@/app/actions/db";
import { auth } from "@/auth";
import HeatMapComponent from "@/components/heatMap";
import GroupUserPanel from "@/components/groupUserPanel";

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
      <div className="h-fit">  {/* Added this wrapper */}
        <GroupUserPanel group={JSON.parse(JSON.stringify(group))} />
      </div>
      {/* Main Content */}
      <div className="p-6 flex-1 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{group.name}</h1>
        <p className="text-gray-600 mb-6 text-center">{group.description}</p>
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Activity</h2>
        <HeatMapComponent values={values} />
      </div>
    </div>
  );
}