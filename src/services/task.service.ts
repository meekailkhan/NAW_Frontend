import api from "@/lib/axios";
import { TaskResponse } from "@/types/task";

interface TaskQueryParams {
  status?: string;
  priority?: string;
  assignedUser?: string;
  page?: number;
  limit?: number;
}

export const getAllTasks = async (
  params: TaskQueryParams
): Promise<TaskResponse> => {
  const { data } = await api.get<TaskResponse>("/task/get-all", {
    params,
  });

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