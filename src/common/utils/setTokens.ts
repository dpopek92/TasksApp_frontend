import { ITokens } from "features/Auth/api/auth.api";

export const setTokens = (tokens: ITokens) => {
  localStorage.setItem("accessToken", tokens.accessToken);
  localStorage.setItem("refreshToken", tokens.refreshToken);
};
