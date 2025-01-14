import React from "react";

export default function GroupUserPanel({ group }) {
  return (
    <div className="w-fit h-fit bg-[#f7f7f7] text-[#333333] p-5 rounded-lg mt-5 shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-center">Members</h2>
      <ul className="min-w-[200px]">
        {group.users.map((user) => (
          <li key={user._id} className="text-[#666666] py-2">
            <button className="w-full py-2 px-6 bg-[#4CAF50] text-[#2f2f2f] rounded-lg hover:bg-[#3e8e41] transition-all">
              {user.username}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
