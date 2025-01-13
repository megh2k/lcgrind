"use client"
export default function ShowRequests({ onClose, user }) {
    const userRequests = user?.requests;
  console.log("HI");
  console.log(userRequests);
  return (
    <div className="fixed top-0 right-0 mt-16 mr-4 z-50 w-80">
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

          <div className="space-y-4">
            {[
              { time: "2 months ago" },
              { time: "4 months ago" },
              { time: "11 months ago" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
              >
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    Your resume review is ready!
                  </p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
