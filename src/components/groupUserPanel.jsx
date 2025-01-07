import React from "react";

export default function GroupUserPanel({ group }) {
  return (
    <div className="w-fit h-fit bg-gray-200 text-gray-800 p-5 rounded-lg mt-5">
      <h2 className="text-lg font-semibold mb-4 text-center">Members</h2>
      <ul className="min-w-[200px]">
        {group.users.map((user) => (
          <li key={user._id} className="text-gray-600 py-2">
            <button
              className="w-full py-2 px-6 bg-green-500 text-gray-900 rounded-lg hover:bg-green-600 transition-all"
            >
              {user.username}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}