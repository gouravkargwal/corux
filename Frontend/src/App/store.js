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
import authReducer from "../Feature/Auth/authSlice";
import colorPredictionReducer from "../Feature/ColorPrediction/colorPredictionSlice";
import snackbarReducer from "../Feature/Snackbar/snackbarSlice";
import balanceReducer from "../Feature/Balance/balanceSlice";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import authTransform from "../Util/authTransform";
import paymentReducer from "../Feature/Payment/paymentSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  transform: [authTransform],
};

const rootReducer = combineReducers({
  auth: authReducer,
  colorPrediction: colorPredictionReducer,
  snackbar: snackbarReducer,
  balance: balanceReducer,
  payment: paymentReducer,
});

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
