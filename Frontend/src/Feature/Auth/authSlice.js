import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/ApiCall";
import { toast } from "react-toastify";

const initialState = {
  token: null,
  loading: null,
  error: null,
  user: null,
  balance: null,
  registrationData: null,
  refreshToken: null,
  isRefreshing: false,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.signinAPI(data);
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

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const { userData, navigate } = payload;
      console.log(userData);
      const response = await API.signupAPI(userData);
      navigate("/home");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state, action) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.balance = null;
    },
    setRegistrationData(state, action) {
      state.registrationData = action.payload;
    },
    setNewTokens(state, action) {
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setRefreshing(state, action) {
      state.isRefreshing = action.payload;
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
      });
  },
});

export const { logoutUser, setRegistrationData, setNewTokens, setRefreshing } =
  authSlice.actions;

export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthRefreshToken = (state) => state.auth.refreshToken;
export const selectAuthIsRefreshing = (state) => state.auth.isRefreshing;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthBalance = (state) => state.auth.balance;
export const selectAuthRegistrationData = (state) =>
  state.auth.registrationData;

export default authSlice.reducer;
