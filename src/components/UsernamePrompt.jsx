"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function UsernamePrompt({ session }) {
  const router = useRouter();
  const [username, setusername] = useState("");
  
  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: session?.user?.email,
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg border border-gray-200 mx-4">
        <div className="px-6 py-5">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            Thanks for Signing In
          </h1>
          <h3 className="mt-1.5 text-xl text-gray-600 text-center">
            Enter your Leetcode Username
          </h3>
          <form onSubmit={createUser} className="mt-5 space-y-4">
            <div className="drop-shadow-sm">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all hover:shadow-md"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg font-medium"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
