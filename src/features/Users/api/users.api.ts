import authorizedApi from "api/interceptor";
import { AxiosResponse } from "axios";
import { IUser } from "features/Users/interfaces/Users.interface";

export const usersApi = {
  getMe: async (): Promise<AxiosResponse<IUser>> => {
    return authorizedApi.get(`/api/users/me`);
  },
};
