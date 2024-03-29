import { store } from "../App/store";
import axiosInstance from "./axiosInstance";

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    console.log(token, "From axios config");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
