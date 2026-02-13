export type TaskStatus = "pending" | "in-progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface AssignedUser {
  _id: string;
  name: string;
  email: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedUser: AssignedUser;
  dueDate: string;
  createdBy: string;
  updateCounter: number;
  isDeleted: boolean;
  comments: any[];
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface TaskResponse {
  success: boolean;
  tasks: Task[];
  pagination: Pagination;
}