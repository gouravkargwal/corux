import React, { useEffect, useState } from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import "../Assets/CSS/Footer.css";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { selectAuthToken } from "../Feature/Auth/authSlice";
import { useSelector } from "react-redux";

export default function Footer() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector(selectAuthToken);
  useEffect(() => {
    // Adjust this logic based on your actual paths
    if (location.pathname === "/home") {
      setValue(0);
    } else if (location.pathname.includes("/home/promotion")) {
      setValue(1);
    } else if (
      location.pathname.includes("/home/profile") ||
      location.pathname.includes("/")
    ) {
      setValue(token ? 2 : 3); // Assuming 3 is the value for login if not authenticated
    } else {
      setValue(0);
    }
  }, [location, token]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/home");
        break;
      case 1:
        navigate("/home/promotion");
        break;
      case 2:
        if (token) {
          navigate("/home/profile");
        } else {
          navigate("/");
        }
        break;
      default:
        navigate("/home");
        break;
    }
  };

  return (
    <>
      <Box>
        <Box
          sx={{ width: "100%", position: "fixed", bottom: 0, display: "block" }}
        >
          <BottomNavigation value={value} onChange={handleChange} showLabels>
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction
              label="Promotion"
              icon={<LocalOfferIcon />}
            />
            {token ? (
              <BottomNavigationAction
                label="Profile"
                icon={<AccountCircleIcon />}
              />
            ) : (
              <BottomNavigationAction
                label="Login"
                icon={<AccountCircleIcon />}
              />
            )}
          </BottomNavigation>
        </Box>
      </Box>
    </>
  );
}
