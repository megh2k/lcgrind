"use client";
import { useState } from "react";
import ShowRequests from "@/components/ShowRequests";
import { LineChart } from "@mui/x-charts/LineChart";

export default function UserDashboard({
  userLanguageStatsData,
  userYearSubmissions,
  user,
}) {
  const [showRequest, setShowRequest] = useState(false);
  return (
    <div className="p-6 relative">
      <button
        onClick={() => setShowRequest(true)}
        className="absolute top-6 right-6 flex items-center gap-3 px-4 py-2 bg-green-800 text-white rounded-full shadow-lg hover:bg-green-900 transition duration-200 group"
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
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span className="text-sm font-semibold">Requests</span>
        {user?.requests?.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-110">
            {user?.requests?.length}
          </span>
        )}
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

      <div className="flex justify-center items-start space-x-6">
        {/* Problems Solved - Small Left Panel */}
        <div className="w-1/5 bg-white border border-gray-300 text-gray-600 p-5 rounded-lg shadow-md">
          <h6 className="text-2xl font-semibold text-gray-800 mb-4">
            Problems Solved
          </h6>
          <ul className="space-y-2">
            {userLanguageStatsData?.map((lang, index) => (
              <li key={index} className="flex justify-between">
                <span className="font-semibold">{lang.languageName}</span>
                <span>{lang.problemsSolved}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Monthly Submissions - Centered Graph */}
        <div className="w-3/4 bg-white border border-gray-300 p-5 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            2025 Monthly Submissions
          </h3>
          <LineChart
            xAxis={[
              {
                scaleType: "point",
                data: userYearSubmissions["months"],
                tickLabelStyle: {
                  angle: 45,
                  textAnchor: "start",
                  fontSize: 12,
                },
              },
            ]}
            series={[
              {
                data: userYearSubmissions["counts"],
                area: true,
              },
            ]}
            width={800}
            height={350}
          />
        </div>
      </div>
    </div>
  );
}
