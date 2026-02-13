import api from "@/lib/axios";

export const addComment = async (
  taskId: string,
  commentText: string
) => {
  const { data } = await api.post(
    `/user/comment/create/${taskId}`,
    { commentText }
  );
 
  return data;
};