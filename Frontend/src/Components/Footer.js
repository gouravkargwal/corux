import React, { useState } from "react";
import {
  Box,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import "../Assets/CSS/Footer.css";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home"; // Import icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import icon for Profile
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

export default function Footer() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate(); // Hook to navigate

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
        navigate("/home/profile");
        break;
      default:
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
            <BottomNavigationAction
              label="Profile"
              icon={<AccountCircleIcon />}
            />
          </BottomNavigation>
        </Box>
      </Box>
    </>
  );
}
