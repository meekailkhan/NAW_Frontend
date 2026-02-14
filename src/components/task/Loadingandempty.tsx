import { useRouter } from "next/navigation";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-16">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-600 rounded-full animate-spin animation-delay-150"></div>
      </div>
      <p className="mt-6 text-gray-600 font-medium animate-pulse">
        Loading tasks...
      </p>

      <style jsx>{`
        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
}

export function EmptyState({ role }: { role: string }) {
  const router = useRouter()
  return (
    <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-6">
        <svg
          className="w-12 h-12 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-3">No Tasks Found</h2>
      <p className="text-gray-600 text-lg max-w-md mx-auto">
        There are no tasks matching your current filters. Try adjusting your
        search criteria or create a new task.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        {role === "admin" && (
          <button onClick={()=> router.push("/task/create") } className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg">
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Task
          </button>
        )}
        {role !== "admin" && (
          <h1>There is no tasks as admin to create tasks</h1>
        )}
      </div>
    </div>
  );
}
