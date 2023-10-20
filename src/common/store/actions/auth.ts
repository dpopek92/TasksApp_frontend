import { IUser } from "features/Users/interfaces/Users.interface";

export const AUTH_USER_LOAD_SUCCESS = "auth/USER_LOAD_SUCCESS";
export const AUTH_LOGOUT_USER = "auth/LOGOUT_USER";

export interface IAuthUserLoadSuccess {
  type: typeof AUTH_USER_LOAD_SUCCESS;
  user: IUser;
}
export interface IAuthLogout {
  type: typeof AUTH_LOGOUT_USER;
}
export type TAuthActions = IAuthUserLoadSuccess | IAuthLogout;

export const authActions = {
  userLoaded: (user: IUser): IAuthUserLoadSuccess => ({
    type: AUTH_USER_LOAD_SUCCESS,
    user,
  }),
  logout: (): IAuthLogout => ({
    type: AUTH_LOGOUT_USER,
  }),
};
