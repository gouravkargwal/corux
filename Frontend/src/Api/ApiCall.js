import axios from "axios";
import axiosInstance from "../Util/axiosInstance";

// Login API
const signinAPI = async (data) => {
  return axiosInstance.post(`/auth/login`, data);
};
const refreshTokenAPI = async (data) => {
  return axiosInstance.post(`/auth/refresh-token`, data);
};
const forgotPasswordAPI = async (data) => {
  return axiosInstance.patch(`/auth/forgot-password`, data);
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
const sendOtpForgotAPI = async (data) => {
  return axiosInstance.post(`/auth/send-otp-forgot`, data);
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
  return axiosInstance.get(`/user/get-profile`, data);
};

const changePasswordAPI = async (data) => {
  return axiosInstance.patch(`/user/change-password`, data);
};

const getReferDetailsAPI = async (data) => {
  return axiosInstance.get(`/user/refer-page/`, data);
};

// Add Money API

const cashfreeAPI = async (data) => {
  return axiosInstance.patch(`/user/cashreeapi`, data);
};

const addMoneyAPI = async (data) => {
  return axiosInstance.post(`/wallet/generate-qr`, data);
};

const saveUtrAPI = async (data) => {
  return axiosInstance.patch(`/wallet/save-utr`, data);
};

const withdrawMoneyAPI = async (data) => {
  return axiosInstance.post(`/wallet/withdraw`, data);
};

const rechargeHistoryAPI = async () => {
  return axiosInstance.get(`/wallet/recharge-transaction`);
};

const withdrawHistoryAPI = async () => {
  return axiosInstance.get(`/wallet/withdraw-transaction`);
};

const resultListAPI = async (data) => {
  return axiosInstance.get(`/result/result-list`, { params: data });
};

const userGameListAPI = async (data) => {
  return axiosInstance.get(`/user/user-win`, { params: data });
};

const API = {
  signinAPI,
  refreshTokenAPI,
  signupAPI,
  sendOtpAPI,
  sendOtpForgotAPI,
  checkUserAPI,
  verifyOtpAPI,
  resendOtpAPI,
  createBetAPI,
  resultColorBetAPI,
  getBalanceAPI,
  changePasswordAPI,
  cashfreeAPI,
  getReferDetailsAPI,
  addMoneyAPI,
  saveUtrAPI,
  withdrawMoneyAPI,
  resultListAPI,
  userGameListAPI,
  rechargeHistoryAPI,
  withdrawHistoryAPI,
  forgotPasswordAPI,
};

export default API;
