import api from "@/plugins/axios";
import type {
  GETTaskParams,
  GETTask,
  POSTAnswerQuestionParams,
  POSTAnswerQuestion
} from "@/@types/services/TaskService";

export const getTaskService = async (params: GETTaskParams): Promise<GETTask> => {
  try {
    const response = await api.get<GETTask>(`/tarefa?id=${params.taskId}`);
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
