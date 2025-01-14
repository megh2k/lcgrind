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
  const userRequested = (group) => {
    const requested = user?.requests.some(
      (item) => item.groupId._id === group._id
    );

    if (requested) {
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
      setAllGroups((prev) =>
        prev.map((group) =>
          group._id === groupId
            ? {
                ...group,
                users: group.users.filter((user) => !(user === userId)),
              }
            : group
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
      <div className="flex justify-end mb-6">
        <button
          onClick={handleCreateGroup}
          className="
            bg-teal-600
            text-white font-semibold
            py-3 px-6
            custom-clip-path
            hover:shadow-lg hover:scale-105
            transition-all duration-300
            rounded-lg
            shadow-md
            mr-4
            "
        >
          Create Group
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {allGroups.map((grp, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-2xl p-6 border-2 border-gray-200 flex flex-col items-start transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center w-full mb-4">
              <img
                src={grp.icon || "/placeholder.svg"}
                alt={grp.name}
                className="w-20 h-20 rounded-full mr-4 border-4 border-blue-300 shadow-md"
              />
              <div className="flex-grow">
                <a
                  href={`/groups/${grp._id}`}
                  className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200"
                >
                  {grp.name}
                </a>
                <p className="text-gray-600 font-medium">
                  Members: {grp.users.length}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 italic mb-4 line-clamp-3">
              {grp.description}
            </p>
            {userJoined(grp) ? (
              <div className="space-x-4 w-full">
                <button
                  onClick={() => handleLeave(user._id, grp._id)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-200 transform hover:-translate-y-1"
                >
                  Leave
                </button>
                {grp.creator === user._id && (
                  <button
                    onClick={() => handleDelete(grp._id)}
                    className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-200 transform hover:-translate-y-1"
                  >
                    Delete
                  </button>
                )}
              </div>
            ) : (
              <>
                {userRequested(grp) ? (
                  <button className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold py-2 px-6 rounded-full shadow-md">
                    Requested
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      user ? setjoinRequest(grp) : router.push("/signin")
                    }
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-200 transform hover:-translate-y-1"
                  >
                    Join
                  </button>
                )}
              </>
            )}
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
