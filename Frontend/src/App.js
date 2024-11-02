import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./Layout/UserLayout";
import AuthLayout from "./Layout/AuthLayout";
import "./App.css";
import PrivateRoute from "./Routes/PrivateRoute";
import "./Util/axiosConfig";
import NotFound from "./Pages/NotFound";
import ScrollToTop from "./Components/UI/ScrollToTop";
import React, { Suspense, lazy } from "react";
import CustomLoadingIndicator from "./Components/UI/CustomLoadingIndicator";
import { Box } from "@mui/material";
import PageLoading from "./Components/UI/PageLoading";

const HomePage = lazy(() => import("./Pages/HomePage"));
const ColorPrediction = lazy(() => import("./Pages/ColorPrediction"));
const MontyHall = lazy(() => import("./Pages/MontyHall"));
const VirtualSlot = lazy(() => import("./Pages/VirtualSlot"));
const TermsAndConditions = lazy(() => import("./Pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const Promotion = lazy(() => import("./Pages/Promotion"));
const Profile = lazy(() => import("./Pages/Profile"));
const ProfileSettings = lazy(() => import("./Pages/ProfileSettings"));
const Bank = lazy(() => import("./Pages/Bank"));
const Wallet = lazy(() => import("./Pages/Wallet"));
const Recharge = lazy(() => import("./Components/Wallet/Recharge/Recharge"));
const ManualAddMoney = lazy(() =>
  import("./Components/Wallet/Recharge/ManualAddMoney")
);
const Withdraw = lazy(() => import("./Components/Wallet/Withdraw"));
const Settings = lazy(() => import("./Pages/Settings"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword"));
const Feature = lazy(() => import("./Pages/Feature"));
const Login = lazy(() => import("./Pages/Login"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const Register = lazy(() => import("./Pages/Register"));
const OtpVerify = lazy(() => import("./Pages/OtpVerify"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="color-prediction" element={<ColorPrediction />} />
            <Route path="monty-hall" element={<MontyHall />} />
            <Route path="virtual-slot" element={<VirtualSlot />} />
            <Route
              path="terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="promotion">
              <Route
                index
                element={
                  <PrivateRoute>
                    <Promotion />
                  </PrivateRoute>
                }
              />
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
              <Route path="recharge">
                <Route
                  index
                  element={
                    <PrivateRoute>
                      <Recharge />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="add-money/:amount"
                  element={
                    <PrivateRoute>
                      <ManualAddMoney />
                    </PrivateRoute>
                  }
                />
              </Route>
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
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Feature />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="register/:referCode?" element={<Register />} />
            <Route path="otp-verify" element={<OtpVerify />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
