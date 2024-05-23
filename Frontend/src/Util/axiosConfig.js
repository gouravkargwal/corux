import createAuthRefreshInterceptor from "axios-auth-refresh";
import axiosInstance from "./axiosInstance";
import { persistor, store } from "../App/store";
import axiosRefreshInstance from "./axiosRefreshInstance";
import { logoutUser, setNewTokens } from "../Feature/Auth/authSlice";
import { openSnackbar } from "../Feature/Snackbar/snackbarSlice";

const refreshToken = (failedRequest) =>
  store.dispatch(async (dispatch, getState) => {
    try {
      const refreshTokenOld = getState().auth.refreshToken;
      const response = await axiosRefreshInstance.post(
        "/auth/refresh-token",
        {},
        {
          headers: { "refresh-token": refreshTokenOld },
        }
      );
      const { access_token, refresh_token } = response.data;

      dispatch(
        setNewTokens({ accessToken: access_token, refreshToken: refresh_token })
      );

      // Modify the failed request's header with the new access token
      failedRequest.response.config.headers[
        "Authorization"
      ] = `Bearer ${access_token}`;
      return Promise.resolve();
    } catch (error) {
      dispatch(logoutUser());
      persistor.purge();
      window.location.assign("/");
      return Promise.reject(error);
    }
  });

// Apply the auth refresh interceptor to the axios instance
createAuthRefreshInterceptor(axiosInstance, refreshToken);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 456) {
        store.dispatch(logoutUser());
        persistor.purge();
        window.location.assign("/");
      }
      store.dispatch(
        openSnackbar({
          message: error.response.data.message || "An error occurred",
          type: "error",
        })
      );
    } else if (error.request) {
      store.dispatch(
        openSnackbar({
          message: "No response received",
          type: "error",
        })
      );
    } else {
      store.dispatch(
        openSnackbar({
          message: error.message,
          type: "error",
        })
      );
    }
    return Promise.reject(error);
  }
);
