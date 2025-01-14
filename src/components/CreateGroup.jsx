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
    } else {
      try {
        const response = await fetch(`/api/groups/create/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: groupName,
            description: description,
            creatorId: user?._id,
          }),
        });
        if (response.ok) {
          router.push("/groups");
        } else {
          console.log("Error creating group");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg border border-gray-200 mx-4 p-4 md:p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Create a New Group
        </h1>
        <form onSubmit={createGroup} className="space-y-6">
          <div className="drop-shadow-sm">
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
          <div className="drop-shadow-sm">
            <textarea
              placeholder="Group Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all h-40"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all hover:shadow-lg font-medium"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
}
