import api from "@/plugins/axios";
import type {
  GETInitializedModules,
  GETModuleTasks,
  GETModuleTasksParams,
  GETModules
} from "@/@types/services/ModulesService";

export const getInitializedModulesService = async (): Promise<GETInitializedModules> => {
  try {
    const response = await api.get<GETInitializedModules>("/modulos-iniciados");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getModulesService = async (): Promise<GETModules> => {
  try {
    const response = await api.get<GETModules>("/modulos");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getModuleTasksService = async (
  params: GETModuleTasksParams
): Promise<GETModuleTasks> => {
  try {
    const response = await api.get<GETModuleTasks>(`/modulo-tarefas?id_module=${params.id_module}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
