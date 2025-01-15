"use client";
import { useState } from "react";
import ShowRequests from "@/components/ShowRequests";

export default function UserDashboard({ userLanguageStatsData, user }) {
  const [showRequest, setShowRequest] = useState(false);
  return (
    <div className="p-6 relative">
      <button
        onClick={() => setShowRequest(true)}
        className="absolute top-6 right-6 flex items-center gap-2 sm:px-4 sm:py-2 px-2 py-1 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700"
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
        <span className="text-sm font-bold">New Requests</span>
      </button>
      {showRequest && (
        <ShowRequests
          onClose={setShowRequest}
          user={JSON.parse(JSON.stringify(user))}
        />
      )}

      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Welcome to your dashboard, {user?.username}!
      </h1>

      <div className="w-1/4 h-fit bg-white border border-[#333] text-[#333333] p-5 rounded-lg mt-5 mb-5 shadow-md ml-6">
        <h3 className="text-2xl font-semibold text-[#333333] mb-4">
          Problems Solved
        </h3>
        <ul className="space-y-2">
          {userLanguageStatsData?.map((lang, index) => (
            <li key={index} className="flex justify-between">
              <span className="font-semibold">{lang.languageName}</span>
              <span>{lang.problemsSolved}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
