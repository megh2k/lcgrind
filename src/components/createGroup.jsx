"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateGroup({ user }) {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  const createGroup = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/signin");
      return;
    }
    else {
        try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_APP_URL}/api/groups/create/`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: groupName, description: description, creatorId: user?._id }),
              }
            );
      
            if (response.ok) {
              router.push("/groups");
            } else {
              console.log("Error creating group");
            }
          } catch (error) {
            console.log(error);
          }
        };
      }
    

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-white text-center">
          Create a New Group
        </h1>
        <h3 className="mt-2 text-xl text-gray-100 text-center">
          Enter Group Details
        </h3>
        <form onSubmit={createGroup} className="mt-4">
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Group Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-4 w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
}
