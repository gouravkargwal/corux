import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthToken } from "../Feature/Auth/authSlice";

const PrivateRoute = ({ children }) => {
  const token = useSelector(selectAuthToken);
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to="/home" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
