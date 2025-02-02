// GroupDetails.js
import React from "react";
import HeatMapComponent from "@/components/HeatMap";
import GroupUserPanel from "@/components/GroupUserPanel";
import {
  getGroupInfo,
  getGroupHeatMapValues,
  getGroupRecentAcSubmissions,
  getGroupRecentAcSubmissionsParallel,
  getGroupHeatMapValuesParallel,
} from "@/app/actions/db";
import RecentAcSubmissions from "@/components/RecentAcSubmissions";

export default async function GroupDetails({ params }) {
  const groupId = (await params)?.id;
  const group = await getGroupInfo(groupId);
  const userNames = group?.users;
  const values = await getGroupHeatMapValuesParallel(userNames);

  const groupRecentAcSubmissions = await getGroupRecentAcSubmissionsParallel(userNames);

  return (
    <div className="flex h-fit min-h-screen">
      {/* Left Panel */}
      <GroupUserPanel group={JSON.parse(JSON.stringify(group))} />
      {/* Main Content */}
      <div className="p-6 flex-1 flex flex-col items-center ml-6 mt-5 mb-5 bg-white border border-[#333] text-[#333333]">
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
        <RecentAcSubmissions
          groupRecentAcSubmissions={groupRecentAcSubmissions}
        />
      </div>
    </div>
  );
}
