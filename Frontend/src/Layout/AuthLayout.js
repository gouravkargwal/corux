import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuthToken } from "../Feature/Auth/authSlice";
const AuthLayout = () => {
  const token = useSelector(selectAuthToken);

  return <>{token ? <Navigate to="/app/home" /> : <Outlet />}</>;
};

export default AuthLayout;
