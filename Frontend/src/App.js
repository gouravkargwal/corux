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
        <Route path="/home" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="color-prediction" element={<ColorPrediction />} />
          <Route path="monty-hall" element={<MontyHall />} />
          <Route path="virtual-slot" element={<VirtualSlot />} />
          <Route path="promotion" element={<Promotion />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile-details" element={<ProfileSettings />} />
          <Route path="bank" element={<Bank />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="recharge" element={<Recharge />} />
          <Route path="withdraw" element={<Withdraw />} />
        </Route>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
