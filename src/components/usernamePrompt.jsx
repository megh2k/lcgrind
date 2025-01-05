"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UsernamePrompt({ session }) {
  const router = useRouter();
  const [username, setusername] = useState("");

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, email: session?.user?.email }),
      });

      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-white text-center">Thanks for Signing In</h1>
        <h3 className="mt-2 text-xl text-gray-100 text-center">Enter your Leetcode Username</h3>
        <form onSubmit={createUser} className="mt-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
