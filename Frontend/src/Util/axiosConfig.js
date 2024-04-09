import { store } from "../App/store";
import {
  logoutUser,
  setNewTokens,
  setRefreshing,
} from "../Feature/Auth/authSlice";
import axiosInstance from "./axiosInstance";

const refreshToken = async () => {
  const refreshTokenOld = store.getState().auth.refreshToken;
  console.log(refreshTokenOld);
  try {
    const response = await axiosInstance.post(
      "auth/refresh-token",
      {},
      {
        headers: {
          "refresh-token": refreshTokenOld,
        },
      }
    );
    console.log(response, "Response from refresh api");
    const { access_token: accessToken, refresh_token: refreshToken } =
      response.data;

    // Here, you'd update the store or context with the new access token
    store.dispatch(setNewTokens({ accessToken, refreshToken }));
    return accessToken; // Return the new access token
  } catch (error) {
    store.dispatch(logoutUser());
    window.location.assign("/");
    throw error;
  }
};

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

let refreshSubscribers = [];

// Function to add subscribers which are waiting for token refresh
const addRefreshTokenSubscriber = (subscriber) => {
  refreshSubscribers.push(subscriber);
};

// Function to notify all subscribers that token has been refreshed
const onRrefreshed = (token) => {
  refreshSubscribers.map((callback) => callback(token));
};

// Response interceptor to handle 403 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    const isRefreshing = store.getState().auth.isRefreshing;

    // Check if we got a 403 and we haven't already retried the request
    if (status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        setRefreshing(true);
        originalRequest._retry = true;

        try {
          const newToken = await refreshToken(); // Attempt to refresh token
          setRefreshing(false);

          // Update axios header and store with new token
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken}`;

          onRrefreshed(newToken); // Notify subscribers

          refreshSubscribers = []; // Reset the subscribers array

          return axiosInstance(originalRequest); // Retry the original request with new token
        } catch (refreshError) {
          setRefreshing(false);
          refreshSubscribers = [];
          return Promise.reject(refreshError); // If token refresh fails, reject the promise
        }
      } else {
        // If token is already refreshing, return a promise that resolves once the token is refreshed
        return new Promise((resolve) => {
          addRefreshTokenSubscriber((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            resolve(axiosInstance(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);
