"use client";
import { useState } from "react";
import ShowRequests from "@/components/ShowRequests";

export default function UserDashboard({ userLanguageStatsData, user }) {
  const [showRequest, setShowRequest] = useState(false);
  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      <button
        onClick={() => setShowRequest(true)}
        className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405M19.5 16.5A2.121 2.121 0 0117 14.12M15 17a6 6 0 10-6-6M9 17a6 6 0 100 0"
          />
        </svg>
        Requests
      </button>

      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Welcome to your dashboard, {user?.username}!
      </h1>

      <h3 className="text-3xl font-semibold text-gray-800 mb-6">
        Problems Solved
      </h3>
      <div className="space-y-4">
        {userLanguageStatsData?.map((lang, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-md shadow-sm">
            <p className="text-lg text-gray-700">
              <span className="font-semibold">{lang.languageName}:</span>{" "}
              {lang.problemsSolved}
            </p>
          </div>
        ))}
      </div>
      {showRequest && (
        <ShowRequests
          onClose={setShowRequest}
          user={JSON.parse(JSON.stringify(user))}
        />
      )}
    </div>
  );
}
