import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./App/store";
import CustomSnackbar from "./Components/UI/CustomSnackbar";
import { ThemeProvider } from "@emotion/react";
import theme from "./Theme/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CustomSnackbar />
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>
);
