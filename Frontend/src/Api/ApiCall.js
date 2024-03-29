import axios from "axios";
import axiosInstance from "../Util/axiosInstance";

// Login API
const signinAPI = async (data) => {
  return axiosInstance.post(`/auth/login`, data);
};

// Register User API Call
const signupAPI = async (data) => {
  return axiosInstance.post(`/auth/register`, data);
};
const checkUserAPI = async (data) => {
  return axiosInstance.post(`/auth/check-mobile-number`, data);
};
const sendOtpAPI = async (data) => {
  return axiosInstance.post(`/auth/send-otp`, data);
};
const verifyOtpAPI = async (data) => {
  return axiosInstance.post(`/auth/verify-otp`, data);
};
const resendOtpAPI = async (data) => {
  return axios.post(`${process.env.BASE_URL}/login`, data);
};

const createBetAPI = async (data) => {
  return axiosInstance.post(`/user/create-bet`, data);
};
const resultColorBetAPI = async (data) => {
  return axiosInstance.post(`/user/result-out`, data);
};

const API = {
  signinAPI,
  signupAPI,
  sendOtpAPI,
  checkUserAPI,
  verifyOtpAPI,
  resendOtpAPI,
  createBetAPI,
  resultColorBetAPI,
};

export default API;
