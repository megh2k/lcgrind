"use client";

import React, { useState } from "react";
import UserDashboard from "@/components/UserDashboard";

export default function Dashboard({ userExists, email }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, email: email }),
      });
      console.log('try 2');
      if (response.ok) {
        console.log('ok response');
        window.location.reload();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to save username");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        {userExists ? (
          <UserDashboard />
        ) : (
            <div>
              <h1 className="text-2xl font-bold text-center">Thanks for Signing In</h1>
            <h2 className="text-2xl font-bold text-center">Enter your Leetcode username</h2>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-lg ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 transition"
                }`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
