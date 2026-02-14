"use client";

import { useEffect, useState } from "react";
import {
  getAllTasks,
  bulkUpdateTasks,
  deleteTask,
  updateTask,
} from "@/services/task.service";
import { Task } from "@/types/task";
import { getRole, logout } from "@/lib/auth";

import { TaskCard } from "./task/TaskCard";
import { TaskFilters } from "./task/Taskfilters";
import { TaskEditModal } from "./task/Taskeditmodal";
import { Pagination } from "./Pegination";
import { EmptyState, LoadingSpinner } from "./task/Loadingandempty";
import { useRouter } from "next/navigation";

export function AllTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const router = useRouter();

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    assignedUser: "",
  });

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const data = await getAllTasks({
        ...filters,
        page,
        limit: 10,
      });

      setTasks(data.tasks);
      setPages(data.pagination.pages);
    } catch (error) {
      console.error("Error fetching tasks", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setRole(getRole());
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [page, filters]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    setPage(1);
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDelete = async (taskId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this task? This action cannot be undone.",
      )
    ) {
      try {
        await deleteTask(taskId);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task", error);
        alert("Failed to delete task. Please try again.");
      }
    }
  };

  const handleBulkUpdate = async () => {
    if (
      window.confirm(
        "Are you sure you want to mark all tasks as completed? This will affect all tasks in the system.",
      )
    ) {
      try {
        await bulkUpdateTasks("completed");
        fetchTasks();
      } catch (error) {
        console.error("Error updating tasks", error);
        alert("Failed to update tasks. Please try again.");
      }
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdateSubmit = async (formData: {
    title: string;
    description: string;
    priority: string;
    dueDate: string;
  }) => {
    if (!editingTask) return;

    try {
      await updateTask(editingTask._id, formData);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task", error);
      alert("Failed to update task. Please try again.");
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Task Management
              </h1>
              <p className="text-gray-600 mt-1 text-lg">
                Organize, track, and manage all your tasks efficiently
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  logout();
                  router.push("/login");
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-red-200 text-red-600 font-semibold rounded-lg hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all shadow-sm hover:shadow-md"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
            {role === "admin" && (
              <button onClick={()=> router.push("/task/create")} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg">
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
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {tasks.length}
                  </p>
                  <p className="text-xs text-gray-500">Total Tasks</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {tasks.filter((t) => t.status === "pending").length}
                  </p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {tasks.filter((t) => t.status === "in-progress").length}
                  </p>
                  <p className="text-xs text-gray-500">In Progress</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {tasks.filter((t) => t.status === "completed").length}
                  </p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <TaskFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          role={role}
          onBulkUpdate={handleBulkUpdate}
        />

        {/* Loading State */}
        {isLoading && <LoadingSpinner />}

        {/* Empty State */}
        {!isLoading && tasks.length === 0 && <EmptyState role={role ?? "user"} />}

        {/* Tasks List */}
        {!isLoading && tasks.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-5">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  role={role}
                  onEdit={handleEditClick}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={pages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        {/* Edit Modal */}
        {editingTask && (
          <TaskEditModal
            task={editingTask}
            onClose={() => setEditingTask(null)}
            onSave={handleUpdateSubmit}
          />
        )}
      </div>
    </div>
  );
}
