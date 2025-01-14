"use client";
import { useState } from "react";

export default function ShowRequests({ onClose, user }) {
  const [userRequests, setuserRequests] = useState(user?.requests);

  const handleJoinRequest = async (creatorId, userId, groupId, action) => {
    try {
      const response = await fetch(
        `/api/groups/join/request/${creatorId}/${userId}/${groupId}/${action}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setuserRequests((prev) =>
          prev.filter(
            (item) =>
              !(item.userId._id === userId && item.groupId._id === groupId)
          )
        );
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute top-0 right-0 mt-16 mr-4 z-50 w-80">
      <div className="bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Requests
            </h2>
            <button
              onClick={() => onClose(false)}
              className="text-gray-400 hover:text-gray-600"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4 text-gray-900">
            {userRequests.length === 0 ? (
              <span>No requests to consider!</span>
            ) : (
              <>
                {userRequests.map(
                  (item, index) =>
                    item.userId._id !== user?._id && (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md"
                      >
                        <button className="flex-shrink-0">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">
                              <strong>{item.userId.username}</strong> requested
                              to join <strong>{item.groupId.name}</strong>
                            </p>

                            <p className="text-sm text-gray-500">{item.time}</p>
                          </div>
                        </button>
                        <div className="flex-shrink-0 ml-auto">
                          <button
                            className="text-green-500 hover:text-green-600 mr-2"
                            onClick={() =>
                              handleJoinRequest(
                                user?._id,
                                item.userId._id,
                                item.groupId._id,
                                "accept"
                              )
                            }
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </button>
                          <button
                            className="text-red-500 hover:text-red-600"
                            onClick={() =>
                              handleJoinRequest(
                                user?._id,
                                item.userId._id,
                                item.groupId._id,
                                "reject"
                              )
                            }
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
