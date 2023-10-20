import authorizedApi from "api/interceptor";
import axios, { AxiosResponse } from "axios";
import { IUser } from "../../Users/interfaces/Users.interface";

export interface ILoginData extends Pick<IUser, "email"> {
  password: string;
}
export interface IRegisterData extends Pick<IUser, "email"> {
  password: string;
}
export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  register: async (
    registerData: IRegisterData
  ): Promise<AxiosResponse<boolean>> => {
    return axios.post(`/api/auth/register`, registerData);
  },
  login: async (
    loginCredentials: ILoginData
  ): Promise<AxiosResponse<ITokens>> => {
    return axios.post(`/api/auth/login`, loginCredentials);
  },
  logout: async (): Promise<AxiosResponse<boolean>> => {
    return authorizedApi.get(`/api/auth/logout`);
  },
};
