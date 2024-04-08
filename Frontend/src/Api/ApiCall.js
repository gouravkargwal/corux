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

// Bet API
const createBetAPI = async (data) => {
  return axiosInstance.post(`/user/create-bet`, data);
};
const resultColorBetAPI = async (data) => {
  return axiosInstance.post(`/user/result-out`, data);
};

// User API
const getBalanceAPI = async (data) => {
  return axiosInstance.post(`/user/get-profile`, data);
};

const changePasswordAPI = async (data) => {
  return axiosInstance.patch(`/user/change-password`, data);
};

// Add Money API

const cashfreeAPI = async (data) => {
  return axiosInstance.patch(`/user/cashreeapi`, data);
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
  getBalanceAPI,
  changePasswordAPI,
  cashfreeAPI,
};

export default API;
