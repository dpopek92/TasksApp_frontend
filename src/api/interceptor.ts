import axios from "axios";
import { setTokens } from "common/utils/setTokens";

const authorizedApi = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

authorizedApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);

authorizedApi.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    const currentRefreshToken = localStorage.getItem("refreshToken");
    if (!currentRefreshToken) return Promise.reject(err);

    if (!originalConfig.url.includes("auth/login") && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const res = await axios.get("/api/auth/refresh-token", {
            headers: { Authorization: `Bearer ${currentRefreshToken}` },
          });

          setTokens(res.data);

          return authorizedApi(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default authorizedApi;
