import api from "@/plugins/axios";

import type {
  ChangeAvatarPayload,
  ChangeAvatarProps,
  ChangeInfosPayload,
  GetLoginProps,
  LoginProps,
  RegisterParams
} from "@/@types/services/UserService";

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

export const changeAvatarUserService = async (
  payload: ChangeAvatarPayload
): Promise<ChangeAvatarProps> => {
  try {
    const response = await api.put<ChangeAvatarProps>("usuario/trocar-avatar", payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const changeUserInfosService = async (payload: ChangeInfosPayload): Promise<void> => {
  try {
    const response = await api.put<void>("usuario/trocar-dados", payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
