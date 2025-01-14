export default function HomePage() {
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col justify-center items-center">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-semibold text-gray-800 mb-6">
          Empowering Groups to Collaborate and Succeed
        </h1>

        <p className="text-xl text-gray-600 mb-6">
          LCGrind is your go-to platform for creating and managing groups.
          Organize, share, and collaborate effortlessly with your team or
          community.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Why LCGrind?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Seamless group creation, efficient task management, and easy
          collaboration tools. Whether for work, study, or any other interest,
          LCGrind has you covered.
        </p>

        <div className="mt-8 space-x-4">
          <form action="/groups/create" method="get" className="inline-block">
            <button
              type="submit"
              className="py-4 px-6 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all hover:shadow-lg font-medium"
            >
              Create a Group
            </button>
          </form>
          <form action="/groups" method="get" className="inline-block">
            <button
              type="submit"
              className="py-4 px-6 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all hover:shadow-lg font-medium"
            >
              Join a Group
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
