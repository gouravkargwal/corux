import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/ApiCall";
import { toast } from "react-toastify";

const initialState = {
  loading: null,
  error: null,
  balance: null,
  mobile: null,
  username: null,
  referCode: null,
};

export const getBalance = createAsyncThunk(
  "balance/getBalance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.getBalanceAPI();
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response?.data?.detail);
      } else if (error.request) {
        return rejectWithValue("No response received");
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.balance = action.payload.balance;
        state.mobile = action.payload.mobile_number;
        state.username = action.payload.username;
        state.referCode = action.payload.refer_code;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectBalanceLoading = (state) => state.balance.loading;
export const selectBalanceError = (state) => state.balance.error;
export const selectBalanceData = (state) => state.balance.balance;
export const selectBalanceUsername = (state) => state.balance.username;
export const selectBalanceMobile = (state) => state.balance.mobile;
export const selectBalanceReferCode = (state) => state.balance.referCode;

export default balanceSlice.reducer;
