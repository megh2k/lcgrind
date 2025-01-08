"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AllGroups({ groups, user }) {
  const router = useRouter();
  const [allGroups, setAllGroups] = useState(groups);

  const userJoined = (group) => {
    if (group?.users?.includes(user?._id)) {
      return true;
    }
    return false;
  };

  const handleJoin = async (groupId) => {
    if (!user) {
      router.push("/signin");
    } else {
      const userId = user._id;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/groups/join/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            groupId,
          }),
        }
      );

      if (response.ok) {
        const updatedGroup = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/groups/${groupId}`
        );
        const groupData = await updatedGroup.json();

        setAllGroups((prevGroups) =>
          prevGroups.map((group) =>
            group._id === groupId ? { ...group, users: groupData.users } : group
          )
        );
      } else {
        console.log("response not ok");
      }
    }
  };

  const handleLeave = async (userId, groupId) => {
    // to be implemented
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/groups/leave/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          groupId,
        }),
      }
    );
    if (response.ok) {
      const updatedGroup = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/groups/${groupId}`
      );
      const groupData = await updatedGroup.json();

      setAllGroups((prevGroups) =>
        prevGroups.map((group) =>
          group._id === groupId ? { ...group, users: groupData.users } : group
        )
      );
    } else {
      console.log("response not ok");
    }
  };

  const handleCreateGroup = () => {
    router.push("/groups/create");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Groups</h1>
        <button
          onClick={handleCreateGroup}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Create Group
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allGroups.map((grp, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex items-start"
          >
            <img
              src={grp.icon}
              alt={grp.name}
              className="w-16 h-16 rounded-full mr-4 flex-shrink-0"
            />
            <div className="flex-grow">
              <a
                href={`/groups/${grp._id}`}
                className="text-lg font-semibold text-gray-800 hover:text-blue-500 cursor-pointer"
              >
                {grp.name}
              </a>
              <p className="text-gray-600">Member Count: {grp.users.length}</p>
              <p className="text-sm text-gray-500 italic mt-2">
                {grp.description.length > 100
                  ? `${grp.description.slice(0, 250)}...`
                  : grp.description}
              </p>
              {userJoined(grp) ? (
                <button
                  onClick={() => handleLeave(user._id, grp._id)}
                  className="mt-2 bg-red-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                >
                  Leave
                </button>
              ) : (
                <button
                  onClick={() => handleJoin(grp._id)}
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                >
                  Join
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
