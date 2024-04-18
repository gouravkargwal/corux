import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/ApiCall";

const initialState = {
  loading: null,
  error: null,
  data: null,
  currentPage: 1,
  page: null,
};

export const getResultList = createAsyncThunk(
  "result/getResultList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.resultListAPI({
        page: data?.page,
        size: data?.size,
      });
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

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setWinnerCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResultList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getResultList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload?.rows;
        const result = action.payload.totalRows / 10;
        state.page = result < 1 ? 1 : Math.ceil(result);
      })
      .addCase(getResultList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectResultLoading = (state) => state.result.loading;
export const selectResultError = (state) => state.result.error;
export const selectResultData = (state) => state.result.data;
export const selectResultCurrentPage = (state) => state.result.currentPage;
export const selectResultPage = (state) => state.result.page;

export const { setWinnerCurrentPage } = resultSlice.actions;

export default resultSlice.reducer;
