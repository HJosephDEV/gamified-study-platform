import api from "@/plugins/axios";
import type { GETInitializedModules } from "@/@types/services/ModulesService";

export const getInitializedModulesService = async (): Promise<GETInitializedModules> => {
  try {
    const response = await api.get<GETInitializedModules>("/modulos-iniciados");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
