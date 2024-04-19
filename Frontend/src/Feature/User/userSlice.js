import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/ApiCall";

const initialState = {
  loading: null,
  error: null,
  data: null,
  currentPage: 1,
  page: null,
};

export const getUserGameList = createAsyncThunk(
  "user/getUserGameList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.userGameListAPI({
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserGameList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserGameList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload?.rows;
        const result = action.payload.totalRows / 10;
        state.page = result < 1 ? 1 : Math.ceil(result);
      })
      .addCase(getUserGameList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setUserCurrentPage } = userSlice.actions;

export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
export const selectUserData = (state) => state.user.data;
export const selectUserCurrentPage = (state) => state.user.currentPage;
export const selectUserPage = (state) => state.user.page;

export default userSlice.reducer;
