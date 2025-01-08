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
          `${process.env.NEXT_PUBLIC_URL}/api/groups/create/`,
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
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg border border-gray-200 mx-4">
        <div className="px-6 py-5">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            Create a New Group
          </h1>
          <h3 className="mt-1.5 text-xl text-gray-600 text-center">
            Enter Group Details
          </h3>
          <form onSubmit={createGroup} className="mt-5 space-y-4">
            <div className="drop-shadow-sm">
              <input
                type="text"
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all hover:shadow-md"
              />
            </div>
            <div className="drop-shadow-sm">
              <textarea
                placeholder="Group Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all hover:shadow-md h-24"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg font-medium"
            >
              Create Group
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}