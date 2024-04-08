import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Util/axiosConfig";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import Register from "./Pages/Register";
import HomePage from "./Pages/HomePage";
import UserLayout from "./Layout/UserLayout";
import AuthLayout from "./Layout/AuthLayout";
import ColorPrediction from "./Pages/ColorPrediction";
import MontyHall from "./Pages/MontyHall";
import VirtualSlot from "./Pages/VirtualSlot";
import Promotion from "./Pages/Promotion";
import Profile from "./Pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Bank from "./Pages/Bank";
import Wallet from "./Pages/Wallet";
import Recharge from "./Components/Wallet/Recharge";
import Withdraw from "./Components/Wallet/Withdraw";
import ProfileSettings from "./Pages/ProfileSettings";
import OtpVerify from "./Pages/OtpVerify";
import Settings from "./Pages/Settings";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="forgot_password" element={<ForgotPassword />} />
          <Route path="register" element={<Register />} />
          <Route path="otp-verify" element={<OtpVerify />} />
        </Route>
        <Route path="/app" element={<UserLayout />}>
          <Route path="home">
            <Route index element={<HomePage />} />
            <Route path="color-prediction" element={<ColorPrediction />} />
            <Route path="monty-hall" element={<MontyHall />} />
            <Route path="virtual-slot" element={<VirtualSlot />} />
          </Route>
          <Route path="promotion">
            <Route index element={<Promotion />} />
          </Route>
          <Route path="profile">
            <Route
              index
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="profile-details"
              element={
                <PrivateRoute>
                  <ProfileSettings />
                </PrivateRoute>
              }
            />
            <Route
              path="bank"
              element={
                <PrivateRoute>
                  <Bank />
                </PrivateRoute>
              }
            />
            <Route
              path="wallet"
              element={
                <PrivateRoute>
                  <Wallet />
                </PrivateRoute>
              }
            />
            <Route
              path="recharge"
              element={
                <PrivateRoute>
                  <Recharge />
                </PrivateRoute>
              }
            />
            <Route
              path="withdraw"
              element={
                <PrivateRoute>
                  <Withdraw />
                </PrivateRoute>
              }
            />
            <Route
              path="settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
