import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/ApiCall";

const initialState = {
  loading: null,
  error: null,
  data: null,
};

export const getReferDetails = createAsyncThunk(
  "refer/getReferDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.getReferDetailsAPI();
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

const referSlice = createSlice({
  name: "refer",
  initialState,
  reducers: {
    setAddAmount(state, action) {
      state.addAmount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReferDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReferDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.detail;
      })
      .addCase(getReferDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectReferLoading = (state) => state.refer.loading;
export const selectReferError = (state) => state.refer.error;
export const selectReferData = (state) => state.refer.data;

export default referSlice.reducer;
