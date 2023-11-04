import api from "@/plugins/axios";
import type {
  GETTask,
  POSTAnswerQuestionParams,
  POSTAnswerQuestion,
  GETTasksParams,
  GETTasks,
  GETTaskParams
} from "@/@types/services/TaskService";

export const getTaskService = async (params: GETTaskParams): Promise<GETTask> => {
  try {
    const response = await api.get<GETTask>(`/tarefa?id=${params.taskId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTasksService = async (params: GETTasksParams): Promise<GETTasks> => {
  try {
    const response = await api.get<GETTasks>(`/tarefas?id_modulo=${params.moduleId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const answerQuestionService = async (
  params: POSTAnswerQuestionParams
): Promise<POSTAnswerQuestion> => {
  try {
    const response = await api.post<POSTAnswerQuestion>(
      `/resposta/enviar?idResposta=${params.answerId}&idTarefa=${params.taskId}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
