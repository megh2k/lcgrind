import { signIn, auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg border border-gray-200 mx-4 px-6 py-5">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
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
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all hover:shadow-lg font-medium"
          >
            <div className="flex items-center space-x-2 justify-center">
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
              { console.log(session)};
            </p>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all hover:shadow-lg font-medium"
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
