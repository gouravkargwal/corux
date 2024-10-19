import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/ApiCall";
import { openSnackbar } from "../Snackbar/snackbarSlice";

const initialState = {
  loading: null,
  error: null,
  gameId: null,
  resultData: null,
  timer: null,
  bettingAllowed: null,
};

export const createBet = createAsyncThunk(
  "user/createBet",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.createBetAPI(data);
      dispatch(
        openSnackbar({
          message: response?.data?.message,
          type: "success",
        })
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

const colorPredictionSlice = createSlice({
  name: "colorPrediction",
  initialState,
  reducers: {
    setResultData(state, action) {
      state.resultData = action.payload;
    },
    setGameId(state, action) {
      state.gameId = action.payload;
    },
    setTimer(state, action) {
      state.timer = action.payload;
    },
    setBettingAllowed(state, action) {
      state.bettingAllowed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBet.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBet.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createBet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setResultData, setGameId, setTimer, setBettingAllowed } =
  colorPredictionSlice.actions;

export const selectBetLoading = (state) => state.colorPrediction.loading;
export const selectBetError = (state) => state.colorPrediction.error;
export const selectGameId = (state) => state.colorPrediction.gameId;
export const selectTimer = (state) => state.colorPrediction.timer;
export const selectBettingAllowed = (state) =>
  state.colorPrediction.bettingAllowed;

export default colorPredictionSlice.reducer;
