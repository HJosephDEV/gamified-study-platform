import api from "@/plugins/axios";
import type { GetAvatarsProps } from "@/@types/services/AvatarsService";

export const getAvatarsService = async (): Promise<GetAvatarsProps> => {
  try {
    const response = await api.get<GetAvatarsProps>("/avatares");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
