import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/ApiCall";

const initialState = {
  rechargeHistoryData: null,
  rechargeHistoryLoading: null,
  rechargeHistoryError: null,
  withdrawHistoryData: null,
  withdrawHistoryLoading: null,
  withHistoryError: null,
};

export const rechargeHistory = createAsyncThunk(
  "wallet/rechargeHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.rechargeHistoryAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const withdrawHistory = createAsyncThunk(
  "wallet/withdrawHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.withdrawHistoryAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(withdrawHistory.pending, (state) => {
        state.withdrawHistoryLoading = true;
      })
      .addCase(withdrawHistory.fulfilled, (state, action) => {
        state.withdrawHistoryLoading = false;
        state.withHistoryError = null;
        state.withdrawHistoryData = action.payload;
      })
      .addCase(withdrawHistory.rejected, (state, action) => {
        state.withdrawHistoryLoading = false;
        state.withHistoryError = action.payload;
      })
      .addCase(rechargeHistory.pending, (state) => {
        state.rechargeHistoryLoading = true;
      })
      .addCase(rechargeHistory.fulfilled, (state, action) => {
        state.rechargeHistoryLoading = false;
        state.rechargeHistoryError = null;
        state.rechargeHistoryData = action.payload;
      })
      .addCase(rechargeHistory.rejected, (state, action) => {
        state.rechargeHistoryLoading = false;
        state.rechargeHistoryError = action.payload.detail;
      });
  },
});

export const selectWalletRechargeHistoryData = (state) =>
  state.wallet.rechargeHistoryData;
export const selectWalletRechargeHistoryLoading = (state) =>
  state.wallet.rechargeHistoryLoading;
export const selectWalletRechargeHistoryError = (state) =>
  state.wallet.rechargeHistoryError;

export const selectWalletWithdrawHistoryData = (state) =>
  state.wallet.withdrawHistoryData;
export const selectWalletWithdrawHistoryError = (state) =>
  state.wallet.withdrawHistoryError;
export const selectWalletWithdrawHistoryLoading = (state) =>
  state.wallet.withdrawHistoryLoading;

export default walletSlice.reducer;
