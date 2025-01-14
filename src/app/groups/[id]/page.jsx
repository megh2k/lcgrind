// GroupDetails.js
import React from "react";
import HeatMapComponent from "@/components/HeatMap";
import GroupUserPanel from "@/components/GroupUserPanel";
import {
  getGroupInfo,
  getGroupHeatMapValues,
  getGroupRecentAcSubmissions,
} from "@/app/actions/db";

export default async function GroupDetails({ params }) {
  const groupId = (await params)?.id;
  const group = await getGroupInfo(groupId);
  const userNames = group?.users;
  const values = await getGroupHeatMapValues(userNames);

  const groupRecentAcSubmissions = await getGroupRecentAcSubmissions(userNames);

  return (
    <div className="flex h-fit min-h-screen">
      {/* Left Panel */}
      <GroupUserPanel group={JSON.parse(JSON.stringify(group))} />
      {/* Main Content */}
      <div className="p-6 flex-1 flex flex-col items-center ml-6 mt-5 mb-5 bg-[#f7f7f7] text-[#333333]">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {group.name}
          </h1>
          <p className="text-gray-600 text-center">{group.description}</p>
        </div>

        {/* Submissions Section */}
        <h2 className="text-2xl font-semibold text-gray-800 text-left">
          Submissions
        </h2>
        <HeatMapComponent values={values} />

        {/* Today's Accepted Submissions */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 text-left">
            Today's Accepted Submissions
          </h2>
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
