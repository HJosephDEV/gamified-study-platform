import api from "@/plugins/axios";

import type { GetLoginProps, LoginProps, RegisterParams } from "@/@types/services/UserService";

export const loginUserService = async (payload: LoginProps): Promise<GetLoginProps> => {
  try {
    const response = await api.post<GetLoginProps>("/usuario/login", payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registerUserService = async (payload: RegisterParams) => {
  try {
    const response = await api.post("/usuario", payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserService = async (): Promise<GetLoginProps> => {
  try {
    const response = await api.get<GetLoginProps>("/usuario");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
