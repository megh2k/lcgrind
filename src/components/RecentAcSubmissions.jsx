"use client";
import React from "react";

export default function RecentAcSubmissions({ groupRecentAcSubmissions }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 text-left">
        Today's Accepted Submissions
      </h2>
      <div className="mt-6">
        {Object.entries(groupRecentAcSubmissions).map(
          ([userName, userValues]) => (
            <div key={userName} className="mb-4">
              <h4 className="text-lg font-semibold text-gray-700">
                {userName}
              </h4>
              <ul>
                {userValues.map((value, index) => (
                  <button
                    key={index}
                    className={`text-white py-2 px-4 rounded w-full h-12 mb-4 ${
                      value.difficulty === "Easy"
                        ? "bg-green-500"
                        : value.difficulty === "Medium"
                        ? "bg-orange-500"
                        : "bg-red-500"
                    } flex justify-center items-center shadow-md transition-all duration-200 transform hover:-translate-y-1`}
                    onClick={() => window.open(value.link, "_blank")}
                  >
                    {value.title}
                  </button>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
}
