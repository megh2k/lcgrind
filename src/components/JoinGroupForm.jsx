"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function JoinGroupForm({ group, user, onClose }) {
  const router = useRouter();
  const [userRequests, setUserRequests] = useState(user?.requests);

  const [formData, setFormData] = useState({
    reason: "",
    experience: "",
  });
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/groups/join/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: formData,
          groupId: group?._id,
          creatorId: group?.creator,
          userId: user?._id,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
      } else {
        onClose(false);
        router.refresh();
      }
    } catch {
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative w-full max-w-md bg-white shadow-md rounded-lg border border-gray-200 mx-4 p-4 md:p-6">
        <button
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Join Group
        </h1>
        <h3 className="text-xl text-gray-600 text-center mb-6">
          Submit your request to join{" "}
          <span className="font-medium">{group?.name}</span>
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="drop-shadow-sm">
            <textarea
              name="reason"
              placeholder="Reason for joining"
              value={formData.reason}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
          <div className="drop-shadow-sm">
            <textarea
              name="experience"
              placeholder="Describe your experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all hover:shadow-lg font-medium"
          >
            Request Group
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2 animate-fade-in">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
