import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import "./App.css";
import Bank from "./Pages/Bank";
import Wallet from "./Pages/Wallet";
import Recharge from "./Components/Wallet/Recharge/Recharge";
import Withdraw from "./Components/Wallet/Withdraw";
import ProfileSettings from "./Pages/ProfileSettings";
import OtpVerify from "./Pages/OtpVerify";
import Settings from "./Pages/Settings";
import PrivateRoute from "./Routes/PrivateRoute";
import ManualAddMoney from "./Components/Wallet/Recharge/ManualAddMoney";
import "./Util/axiosConfig";
import ResetPassword from "./Pages/ResetPassword";
import NotFound from "./Pages/NotFound";
import TermsAndConditions from "./Pages/TermsAndConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import ContactUs from "./Pages/ContactUs";
import Feature from "./Pages/Feature";
import ScrollToTop from "./Components/UI/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="color-prediction" element={<ColorPrediction />} />
          <Route path="monty-hall" element={<MontyHall />} />
          <Route path="virtual-slot" element={<VirtualSlot />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
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
    </BrowserRouter>
  );
}

export default App;
