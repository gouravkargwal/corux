import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authReducer, { logoutUser } from "../Feature/Auth/authSlice";
import colorPredictionReducer from "../Feature/ColorPrediction/colorPredictionSlice";
import snackbarReducer from "../Feature/Snackbar/snackbarSlice";
import balanceReducer from "../Feature/Balance/balanceSlice";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import paymentReducer from "../Feature/Payment/paymentSlice";
import referReducer from "../Feature/Refer/referSlice";
import resultReducer from "../Feature/Result/resultSlice";
import userReducer from "../Feature/User/userSlice";
import walletReducer from "../Feature/Wallet/walletSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const appReducer = combineReducers({
  auth: authReducer,
  colorPrediction: colorPredictionReducer,
  snackbar: snackbarReducer,
  balance: balanceReducer,
  payment: paymentReducer,
  refer: referReducer,
  result: resultReducer,
  user: userReducer,
  wallet: walletReducer,
});

const rootReducer = (state, action) => {
  if (action.type === logoutUser.type) {
    state = {};
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV !== "production"
      ? getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(logger)
      : getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
});

export const persistor = persistStore(store);
