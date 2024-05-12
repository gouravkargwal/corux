import axios from "axios";
axios.defaults.withCredentials = true;
const axiosRefreshInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default axiosRefreshInstance;
