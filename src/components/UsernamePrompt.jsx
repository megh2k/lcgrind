"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UsernamePrompt({ session }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear any existing errors

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

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
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
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className={`w-full p-3 border ${
                  error ? 'border-red-500' : 'border-gray-200'
                } rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all hover:shadow-md`}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Checking...' : 'Register'}
            </button>
            {error && (
              <p className="text-red-500 text-sm mt-2 animate-fade-in">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
