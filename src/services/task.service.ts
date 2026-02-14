import api from "@/lib/axios";
import { Task, TaskResponse } from "@/types/task";

interface TaskQueryParams {
  status?: string;
  priority?: string;
  assignedUser?: string;
  page?: number;
  limit?: number;
}

export interface SingleTaskResponse {
  success: boolean;
  task: Task;
}

export const getAllTasks = async (
  params: TaskQueryParams
): Promise<TaskResponse> => {
  const { data } = await api.get<TaskResponse>("/task/get-all", {
    params,
  });

  return data;
};


export const getTaskById = async (
  taskId: string
): Promise<SingleTaskResponse> => {
  const { data } = await api.get<SingleTaskResponse>(
    `/task/getTask/${taskId}`
  );
  return data;
};

export const deleteTask = async (taskId: string) => {
  const { data } = await api.patch(`/task/delete/${taskId}`);
  return data;
};

export const updateTask = async (
  taskId: string,
  payload: {
    title?: string;
    description?: string;
    priority?: string;
    dueDate?: string;
  }
) => {
  const { data } = await api.patch(`/task/update/${taskId}`, payload);
  return data;
};

export const bulkUpdateTasks = async (status: string) => {
  const { data } = await api.patch(`/task/bulk/update`, { status });
  return data;
};

export const deleteComment = async (
  taskId: string,
  commentId: string
) => {
  const { data } = await api.delete(
    `/task/comment/${taskId}/${commentId}`
  );
  return data;
};


export const updateTaskStatus = async (
  taskId: string,
  status: string
) => {
  const { data } = await api.patch(
    `/task/update/status/${taskId}`,
    { status }
  );
  return data;
};

export const partialUpdateTask = async (
  taskId: string,
  payload: {
    priority?: string;
    dueDate?: string;
    description?: string;
  }
) => {
  const { data } = await api.patch(
    `/task/update/partial/${taskId}`,
    payload
  );
  return data;
};

export const reassignTask = async (
  taskId: string,
  assignedUser: string
) => {
  const { data } = await api.patch(
    `/task/reassign/${taskId}`,
    { assignedUser }
  );
  return data;
};

export const createTask = async (payload: {
  title: string;
  description: string;
  priority: string;
  assignedUser: string;
  dueDate: string;
}) => {
  const { data } = await api.post("/task/create", payload);
  return data;
};