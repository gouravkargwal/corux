import { store } from "../App/store";
import {
  logoutUser,
  setNewTokens,
  setRefreshing,
} from "../Feature/Auth/authSlice";
import axiosInstance from "./axiosInstance";
import axiosRefreshInstance from "./axiosRefreshInstance";

let refreshSubscribers = [];

const addRefreshTokenSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

const onRrefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
};

const refreshToken = async () => {
  try {
    const refreshTokenOld = store.getState().auth.refreshToken;
    const response = await axiosRefreshInstance.post(
      "auth/refresh-token",
      {},
      {
        headers: {
          "refresh-token": refreshTokenOld,
        },
      }
    );
    const { access_token: accessToken, refresh_token: refreshTokenNew } =
      response.data;
    store.dispatch(
      setNewTokens({ accessToken, refreshToken: refreshTokenNew })
    );
    store.dispatch(setRefreshing(false)); // Reset refreshing flag after successful refresh
    onRrefreshed(accessToken); // Notify subscribers with the new token
    refreshSubscribers = []; // Clear subscribers after notifying
    return accessToken;
  } catch (error) {
    store.dispatch(logoutUser());
    store.dispatch(setRefreshing(false)); // Ensure to reset the refreshing flag even on failure
    onRrefreshed(null); // Notify subscribers that no new token is available
    window.location.assign("/");
    return null;
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const isRefreshing = store.getState().auth.isRefreshing;
    if (
      status === 401 &&
      !config._retry &&
      !config.url.includes("refresh-token")
    ) {
      if (!isRefreshing) {
        store.dispatch(setRefreshing(true));
        const newToken = await refreshToken();
        if (newToken) {
          config.headers["Authorization"] = `Bearer ${newToken}`;
          store.dispatch(setRefreshing(false));
          return axiosInstance(config);
        } else {
          config._retry = true;
          store.dispatch(logoutUser());
          store.dispatch(setRefreshing(false));
          window.location.assign("/");
          return Promise.reject(error);
        }
      } else {
        console.log("Inside other refreshing block");
        return new Promise((resolve, reject) => {
          addRefreshTokenSubscriber((token) => {
            if (token) {
              console.log("TOken exists");
              config.headers["Authorization"] = `Bearer ${token}`;
              resolve(axiosInstance(config));
            } else {
              store.dispatch(logoutUser());
              store.dispatch(setRefreshing(false)); // It's crucial to reset this flag here as well.
              window.location.assign("/");
              reject(new Error("Token refresh failed, user is logged out."));
            }
          });
        });
      }
    }
    // For errors other than 401, just return the error
    return Promise.reject(error);
  }
);
