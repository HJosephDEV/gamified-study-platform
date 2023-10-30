import api from "@/plugins/axios";
import type { GETTaskParams, GETTask } from "@/@types/services/TaskService";

export const getTaskService = async (params: GETTaskParams): Promise<GETTask> => {
  try {
    const response = await api.get<GETTask>(`/tarefa?id=${params.taskId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
