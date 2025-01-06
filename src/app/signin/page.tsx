// src/app/page.tsx
import { signIn, auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Welcome to LCGrind
        </h1>

        <form
          className="mt-8 space-y-6"
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              ></svg>
              <span>Sign in with Google</span>
            </div>
          </button>
        </form>

        {session ? (
          <div className="mt-4 space-y-4">
            <p className="text-center text-sm text-gray-600">
              Signed in as {session.user?.email}
            </p>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          <p className="mt-4 text-center text-sm text-gray-600">
            Please sign in to continue
          </p>
        )}
      </div>
    </div>
  );
}
