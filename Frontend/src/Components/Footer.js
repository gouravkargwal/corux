import React, { useEffect, useState } from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useSelector } from "react-redux";
import { selectAuthToken } from "../Feature/Auth/authSlice";
import AddCardIcon from "@mui/icons-material/AddCard";
import LoginIcon from "@mui/icons-material/Login";

const navigationPaths = [
  { value: 0, path: "/", label: "Home", icon: <HomeIcon /> },
  {
    value: 1,
    path: "/promotion",
    label: "Promotion",
    condition: (token) => token,
    icon: <LocalOfferIcon />,
  },
  {
    value: 2,
    path: "/profile/recharge",
    label: "Recharge",
    condition: (token) => token,
    icon: <AddCardIcon />,
  },
  {
    value: 3,
    path: "/profile",
    label: "Profile",
    condition: (token) => token,
    icon: <AccountCircleIcon />,
  },
  {
    value: 4,
    path: "/auth",
    label: "Login",
    condition: (token) => !token,
    icon: <LoginIcon />,
  },
];

export default function Footer() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector(selectAuthToken);

  useEffect(() => {
    const foundPath = navigationPaths.reduce((longestMatch, currentPath) => {
      const regex = new RegExp(`^${currentPath.path}`);
      if (
        regex.test(location.pathname) &&
        currentPath.path.length > longestMatch.path.length
      ) {
        return currentPath;
      }
      return longestMatch;
    }, navigationPaths[0]);

    setValue(foundPath.value);
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const pathInfo = navigationPaths.find((path) => path.value === newValue);
    if (pathInfo && (!pathInfo.condition || pathInfo.condition(token))) {
      navigate(pathInfo.path);
    }
  };

  return (
    <>
      <Box
        sx={{ width: "100%", position: "fixed", bottom: 0, display: "block" }}
      >
        <BottomNavigation value={value} onChange={handleChange} showLabels>
          {navigationPaths.map(
            (path) =>
              (!path.condition || path.condition(token)) && (
                <BottomNavigationAction
                  key={path.value}
                  label={path.label}
                  icon={path.icon}
                />
              )
          )}
        </BottomNavigation>
      </Box>
    </>
  );
}
