"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import JoinGroupForm from "@/components/JoinGroupForm";

export default function AllGroups({ groups, user }) {
  const router = useRouter();
  const [allGroups, setAllGroups] = useState(groups);
  const [joinRequest, setjoinRequest] = useState(null);

  const userJoined = (group) => {
    if (group?.users?.includes(user?._id)) {
      return true;
    }
    return false;
  };

  // const handleJoin = async (groupId) => {
  //   if (!user) {
  //     router.push("/signin");
  //   } else {
  //     const userId = user._id;
  //     const response = await fetch(`/api/groups/join/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userId,
  //         groupId,
  //       }),
  //     });

  //     if (response.ok) {
  //       const updatedGroup = await fetch(`/api/groups/${groupId}`);
  //       const groupData = await updatedGroup.json();

  //       setAllGroups((prevGroups) =>
  //         prevGroups.map((group) =>
  //           group._id === groupId ? { ...group, users: groupData.users } : group
  //         )
  //       );
  //     } else {
  //       console.log("response not ok");
  //     }
  //   }
  // };

  const handleLeave = async (userId, groupId) => {
    const response = await fetch(`/api/groups/leave/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        groupId,
      }),
    });
    if (response.ok) {
      const updatedGroup = await fetch(`/api/groups/${groupId}`);
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

  const handleDelete = async (groupId) => {
    // to be implemented
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
                <div className="space-x-4">
                  <button
                    onClick={() => handleLeave(user._id, grp._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 my-4 rounded-full"
                  >
                    Leave
                  </button>
                  {grp.creator === user._id && (
                    <button
                      onClick={() => handleDelete(grp._id)}
                      className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-5 my-4 rounded-full"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setjoinRequest(grp)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 my-4 rounded-full"
                >
                  Join
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {joinRequest && (
        <JoinGroupForm
          group={joinRequest}
          user={user}
          onClose={setjoinRequest}
        />
      )}
    </div>
  );
}
