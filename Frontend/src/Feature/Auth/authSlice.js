import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/ApiCall";
import { toast } from "react-toastify";

const initialState = {
  token: "askdjaslkdjaslkdjkasljdas",
  loading: null,
  error: null,
  user: "gourav",
  balance: 841541511515151,
  registrationData: null,
  refreshToken: null,
  forgotPhone: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.signinAPI(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const { userData, navigate } = payload;
      const response = await API.signupAPI(userData);
      navigate("/auth");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state, action) {
      state.token = null;
      state.loading = null;
      state.error = null;
      state.user = null;
      state.balance = null;
      state.registrationData = null;
      state.refreshToken = null;
      state.forgotPhone = null;
    },
    setRegistrationData(state, action) {
      state.registrationData = action.payload;
    },
    setForgotPhoneData(state, action) {
      state.forgotPhone = action.payload;
    },
    setNewTokens(state, action) {
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.user = action.payload.mobile_number;
        state.balance = action.payload.balance;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.user = action.payload.mobile_number;
        state.balance = action.payload.balance;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {
  logoutUser,
  setRegistrationData,
  setNewTokens,
  setForgotPhoneData,
} = authSlice.actions;

export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthRefreshToken = (state) => state.auth.refreshToken;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthBalance = (state) => state.auth.balance;
export const selectAuthRegistrationData = (state) =>
  state.auth.registrationData;
export const selectAuthForgotPhoneData = (state) => state.auth.forgotPhone;

export default authSlice.reducer;
