import React from "react";
import {
  getUserByEmail,
  getGroupInfo,
  getGroupHeatMapValues,
  getGroupRecentAcSubmissions,
} from "@/app/actions/db";
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

  const groupRecentAcSubmissions = await getGroupRecentAcSubmissions(userNames);
  console.log(groupRecentAcSubmissions);

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="h-fit">
        <GroupUserPanel group={JSON.parse(JSON.stringify(group))} />
      </div>
      {/* Main Content with more padding/margin to the right */}
      <div className="p-6 flex-1 flex flex-col ml-6">
        {/* Group name and description centered */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {group.name}
          </h1>
          <p className="text-gray-600 text-center">{group.description}</p>
        </div>

        {/* Other content aligned to the left */}
        <h2 className="text-2xl font-semibold text-gray-800 text-left">
          Submissions
        </h2>
        <HeatMapComponent values={values} />

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 text-left">
            Today's Accepted Submissions
          </h2>
          {/* User submissions list */}
          <div className="mt-6">
            {Object.entries(groupRecentAcSubmissions).map(
              ([userName, userValues]) => (
                <div key={userName} className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-700">
                    {userName}
                  </h4>
                  <ul>
                    {userValues.map((value, index) => (
                      <li key={index} className="text-gray-600">
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
