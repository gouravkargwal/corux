import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/ApiCall";

const initialState = {
  loading: null,
  error: null,
  data: null,
  addAmount: null,
};

export const getReceiverDetails = createAsyncThunk(
  "payment/getReceiverDetails",
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

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setAddAmount(state, action) {
      state.addAmount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReceiverDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReceiverDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.detail;
      })
      .addCase(getReceiverDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setAddAmount } = paymentSlice.actions;

export const selectPaymentLoading = (state) => state.payment.loading;
export const selectPaymentError = (state) => state.payment.error;
export const selectPaymentData = (state) => state.payment.data;
export const selectPaymentAddAmount = (state) => state.payment.addAmount;

export default paymentSlice.reducer;
